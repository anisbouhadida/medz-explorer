import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

type MedicineStatus = 'In Stock' | 'Review';

type MedicineCard = {
  readonly name: string;
  readonly summary: string;
  readonly status: MedicineStatus;
  readonly dosage: string;
  readonly shelf: string;
  readonly cadence: string;
};

const MEDICINE_CATALOGUE: readonly MedicineCard[] = [
  {
    name: 'Cefazolin IV',
    summary:
      'Peri-operative antibiotic coverage with rapid preparation and traceable shelf rotation.',
    status: 'In Stock',
    dosage: '1 g vial',
    shelf: 'Cold chain A3',
    cadence: 'Reviewed 2 h ago',
  },
  {
    name: 'Heparin Sodium',
    summary: 'High-alert anticoagulant inventory monitored through dual-signature verification.',
    status: 'Review',
    dosage: '5,000 IU / mL',
    shelf: 'Vault B1',
    cadence: 'Audit due today',
  },
  {
    name: 'Insulin Glargine',
    summary:
      'Temperature-sensitive stock with editorialized notes for batch longevity and substitution.',
    status: 'In Stock',
    dosage: '100 U / mL pen',
    shelf: 'Refrigerated D2',
    cadence: 'Reviewed 18 min ago',
  },
];

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block min-h-screen',
  },
})
export class App {
  protected readonly searchQuery = signal('');
  protected readonly medicineCatalogue = MEDICINE_CATALOGUE;
  protected readonly filteredCatalogue = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();

    if (!query) {
      return this.medicineCatalogue;
    }

    return this.medicineCatalogue.filter((medicine) => {
      const searchableText = [
        medicine.name,
        medicine.summary,
        medicine.status,
        medicine.dosage,
        medicine.shelf,
        medicine.cadence,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });
  });

  protected onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    this.searchQuery.set(input?.value ?? '');
  }
}
