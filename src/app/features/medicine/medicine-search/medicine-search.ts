import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Medicine } from '../../../shared/service/api/medicine';
import { Medicine as MedicineModel, MedicineStatus } from '../../../shared/model/medicine';

type MedicineTableRow = Pick<
  MedicineModel,
  'brandName' | 'code' | 'registrationNumber' | 'laboratoryHolder'
>;
@Component({
  selector: 'app-medicine-search',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
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

  private readonly medicinesResource = rxResource({
    params: () => {
      const searchText = this.searchQuery();
      return { ...(searchText ? { searchText } : {}), status: MedicineStatus.ACTIVE };
    },
    stream: ({ params }) =>
      this.medicineApi.searchMedicines(params).valueChanges.pipe(
        map(({ data }) =>
          (data?.medicinesSearch ?? []).map((medicine) => ({
            brandName: medicine.brandName ?? '',
            code: medicine.code ?? '',
            registrationNumber: medicine.registrationNumber ?? '',
            laboratoryHolder: medicine.laboratoryHolder ?? '',
          })),
        ),
      ),
    defaultValue: [] as MedicineTableRow[],
  });

  protected readonly medicines = this.medicinesResource.value;

  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.searchQuery.set(input?.value ?? '');
  }
}
