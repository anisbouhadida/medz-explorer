import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { Medicine, MedicineSearchFilter } from '../../../shared/service/api/medicine';
import { Medicine as MedicineModel, MedicineStatus } from '../../../shared/model/medicine';

type MedicineTableRow = Pick<
  MedicineModel,
  'brandName' | 'code' | 'registrationNumber' | 'laboratoryHolder'
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

  displayedColumns: string[] = ['brandName', 'code', 'registrationNumber', 'laboratoryHolder'];
  protected readonly searchQuery = signal('');

  private readonly medicinesResource = rxResource<MedicineSearchResult, MedicineSearchFilter>({
    params: () => {
      const searchText = this.searchQuery();
      return { ...(searchText ? { searchText } : {}), status: MedicineStatus.ACTIVE };
    },
    stream: ({ params }) =>
      this.medicineApi.searchMedicines(params).valueChanges.pipe(
        map(({ data, loading, error }) => ({
          rows: (data?.medicinesSearch ?? []).map((medicine) => ({
            brandName: medicine.brandName ?? '',
            code: medicine.code ?? '',
            registrationNumber: medicine.registrationNumber ?? '',
            laboratoryHolder: medicine.laboratoryHolder ?? '',
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
}
