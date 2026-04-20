import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {
  Medicine,
  MedicinePaginationArgs,
  MedicineSearchFilter,
  MedicineSortField,
  MedicineSortInput,
  PageInfo,
  SortDirection,
} from '../../../shared/service/api/medicine';
import {
  Medicine as MedicineModel,
  MedicineOrigin,
  MedicineStatus,
} from '../../../shared/model/medicine';

type MedicineTableRow = Pick<
  MedicineModel,
  'id' | 'brandName' | 'internationalCommonDenomination' | 'form' | 'status' | 'origin'
>;

interface MedicineSearchResult {
  rows: MedicineTableRow[];
  loading: boolean;
  error: unknown;
  pageInfo: PageInfo | null;
  totalCount: number | null;
}

interface MedicineResourceParams {
  filter: MedicineSearchFilter;
  pagination: MedicinePaginationArgs;
  sort: MedicineSortInput[];
}

@Component({
  selector: 'app-medicine-search',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './medicine-search.html',
  styleUrl: './medicine-search.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicineSearch {
  private readonly medicineApi = inject(Medicine);
  private readonly router = inject(Router);

  displayedColumns: string[] = [
    'brandName',
    'internationalCommonDenomination',
    'form',
    'status',
    'origin',
    'actions',
  ];
  protected readonly MedicineStatus = MedicineStatus;
  protected readonly MedicineOrigin = MedicineOrigin;
  protected readonly searchQuery = signal('');
  protected readonly selectedOrigin = signal<MedicineOrigin | undefined>(undefined);
  protected readonly selectedStatus = signal<MedicineStatus>(MedicineStatus.ACTIVE);
  protected readonly pageSize = signal(20);

  // Persisted across loading states so paginator never disables during fetch
  private readonly _totalCount = signal(0);
  protected readonly totalCount = this._totalCount.asReadonly();

  // Bound to [pageIndex] on the paginator to keep it in sync when filters/sort reset
  protected readonly currentPageIndex = signal(0);

  // Stack of endCursors for visited pages.
  // [] = page 1, [ec1] = page 2 (fetch after:ec1), [ec1,ec2] = page 3, etc.
  // LAST_PAGE_SENTINEL as last entry = fetch last page via last: N
  private readonly cursorStack = signal<string[]>([]);

  protected readonly sortField = signal<MedicineSortField>(MedicineSortField.REGISTRATION_NUMBER);
  protected readonly sortDirection = signal<SortDirection>(SortDirection.ASC);

  // Maps internal sortField to the mat-sort-header ID (only visible columns have headers)
  protected readonly activeSortHeaderId = computed(() =>
    this.sortField() === MedicineSortField.BRAND_NAME ? 'BRAND_NAME' : '',
  );
  protected readonly activeSortDirection = computed(
    () => this.sortDirection().toLowerCase() as 'asc' | 'desc',
  );

  private readonly medicinesResource = rxResource<MedicineSearchResult, MedicineResourceParams>({
    params: () => {
      const searchText = this.searchQuery();
      const origin = this.selectedOrigin();
      const status = this.selectedStatus();
      const stack = this.cursorStack();
      const size = this.pageSize();

      const filter: MedicineSearchFilter = {
        ...(searchText ? { searchText } : {}),
        ...(origin ? { origin } : {}),
        status,
      };

      const pagination: MedicinePaginationArgs =
        stack.length === 0 ? { first: size } : { first: size, after: stack[stack.length - 1] };

      const sort: MedicineSortInput[] = [
        { field: this.sortField(), direction: this.sortDirection() },
      ];

      return { filter, pagination, sort };
    },
    stream: ({ params }) =>
      this.medicineApi
        .searchMedicines(params.filter, params.pagination, params.sort)
        .valueChanges.pipe(
          map(({ data, loading, error }) => {
            const connection = data?.medicinesSearch ?? null;
            const totalCount =
              connection != null ? ((connection.totalCount as number | undefined) ?? null) : null;
            // Persist totalCount outside loading states so paginator stays enabled
            if (totalCount != null) {
              this._totalCount.set(totalCount);
            }
            return {
              rows: (connection?.edges ?? []).flatMap(({ node }) =>
                node
                  ? [
                      {
                        id: node.id ?? '',
                        brandName: node.brandName ?? '',
                        internationalCommonDenomination: node.internationalCommonDenomination ?? '',
                        form: node.form ?? '',
                        status: node.status ?? MedicineStatus.ACTIVE,
                        origin: node.origin ?? MedicineOrigin.MANUFACTURED,
                      },
                    ]
                  : [],
              ),
              loading,
              error,
              pageInfo: (connection?.pageInfo as PageInfo | undefined) ?? null,
              totalCount,
            };
          }),
        ),
    defaultValue: {
      rows: [],
      loading: true,
      error: undefined,
      pageInfo: null,
      totalCount: null,
    } as MedicineSearchResult,
  });

  protected readonly medicines = computed(() => this.medicinesResource.value().rows);
  protected readonly isLoading = computed(() => this.medicinesResource.value().loading);
  protected readonly error = computed(() => this.medicinesResource.value().error);
  private readonly pageInfo = computed(() => this.medicinesResource.value().pageInfo);

  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.searchQuery.set(input?.value ?? '');
    this.cursorStack.set([]);
    this.currentPageIndex.set(0);
  }

  protected onViewMedicine(id: string): void {
    this.router.navigate(['/medicine', id]);
  }

  protected onOriginChange(list: MatSelectionList): void {
    const selected = list.selectedOptions.selected;
    if (selected.length > 1) {
      const latest = selected[selected.length - 1];
      list.deselectAll();
      latest.selected = true;
    }
    const current = list.selectedOptions.selected;
    this.selectedOrigin.set(current.length ? (current[0].value as MedicineOrigin) : undefined);
    this.cursorStack.set([]);
    this.currentPageIndex.set(0);
  }

  protected onStatusSelect(status: MedicineStatus): void {
    this.selectedStatus.set(status);
    this.cursorStack.set([]);
    this.currentPageIndex.set(0);
  }

  protected onSortChange(sort: Sort): void {
    // matSortDisableClear ensures direction is always 'asc' | 'desc', never ''
    this.sortField.set(sort.active as MedicineSortField);
    this.sortDirection.set(sort.direction.toUpperCase() as SortDirection);
    this.cursorStack.set([]);
    this.currentPageIndex.set(0);
  }

  protected onPageChange(event: PageEvent): void {
    const info = this.pageInfo();
    const size = event.pageSize;
    const previousIndex = event.previousPageIndex ?? this.currentPageIndex();

    // Batch-friendly: update all signals after decisions are made
    let nextStack = this.cursorStack();

    if (event.pageSize !== this.pageSize()) {
      // Page size changed — reset to first page
      this.pageSize.set(size);
      this.cursorStack.set([]);
      this.currentPageIndex.set(0);
      return;
    }

    if (event.pageIndex === 0) {
      this.cursorStack.set([]);
      this.currentPageIndex.set(0);
      return;
    }

    if (event.pageIndex > previousIndex) {
      // Forward — push current page's endCursor
      const endCursor = info?.endCursor;
      if (endCursor) {
        nextStack = [...nextStack, endCursor];
      }
    } else {
      // Backward — pop to reveal previous page's cursor
      nextStack = nextStack.length <= 1 ? [] : nextStack.slice(0, -1);
    }

    this.cursorStack.set(nextStack);
    this.currentPageIndex.set(event.pageIndex);
  }
}
