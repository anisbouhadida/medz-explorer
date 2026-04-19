import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
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
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './medicine-search.html',
  styleUrl: './medicine-search.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicineSearch implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly medicineApi = inject(Medicine);

  displayedColumns: string[] = ['brandName', 'code', 'registrationNumber', 'laboratoryHolder'];
  protected readonly medicines = signal<MedicineTableRow[]>([]);
  protected readonly searchQuery = signal('');

  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.searchQuery.set(input?.value ?? '');
  }

  ngOnInit(): void {
    this.medicineApi
      .searchMedicines({
        status: MedicineStatus.ACTIVE,
      })
      .valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ data }) => {
        this.medicines.set(
          (data?.medicinesSearch ?? []).map((medicine) => ({
            brandName: medicine.brandName ?? '',
            code: medicine.code ?? '',
            registrationNumber: medicine.registrationNumber ?? '',
            laboratoryHolder: medicine.laboratoryHolder ?? '',
          })),
        );
      });
  }
}
