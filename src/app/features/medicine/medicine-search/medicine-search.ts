import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Medicine, MedicineSearchFilter } from '../../../shared/service/api/medicine';
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

  private readonly medicinesResource = rxResource<MedicineSearchResult, MedicineSearchFilter>({
    params: () => {
      const searchText = this.searchQuery();
      const origin = this.selectedOrigin();
      const status = this.selectedStatus();
      return {
        ...(searchText ? { searchText } : {}),
        ...(origin ? { origin } : {}),
        status,
      };
    },
    stream: ({ params }) =>
      this.medicineApi.searchMedicines(params).valueChanges.pipe(
        map(({ data, loading, error }) => ({
          rows: (data?.medicinesSearch ?? []).map((medicine) => ({
            id: medicine.id ?? '',
            brandName: medicine.brandName ?? '',
            internationalCommonDenomination: medicine.internationalCommonDenomination ?? '',
            form: medicine.form ?? '',
            status: medicine.status ?? MedicineStatus.ACTIVE,
            origin: medicine.origin ?? MedicineOrigin.MANUFACTURED,
          })),
          loading,
          error,
        })),
      ),
    defaultValue: { rows: [], loading: true, error: undefined } as MedicineSearchResult,
  });

  protected readonly medicines = computed(() => this.medicinesResource.value().rows);
  protected readonly isLoading = computed(() => this.medicinesResource.value().loading);
  protected readonly error = computed(() => this.medicinesResource.value().error);

  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.searchQuery.set(input?.value ?? '');
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
  }

  protected onStatusSelect(status: MedicineStatus): void {
    this.selectedStatus.set(status);
  }
}
