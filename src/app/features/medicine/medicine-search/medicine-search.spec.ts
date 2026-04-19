import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MedicineSearch } from './medicine-search';
import { Medicine } from '../../../shared/service/api/medicine';

const medicineApiMock = {
  searchMedicines: () =>
    ({
      valueChanges: of({
        data: {
          medicinesSearch: [],
        },
      }),
    }) as unknown as ReturnType<Medicine['searchMedicines']>,
};

describe('MedicineSearch', () => {
  let component: MedicineSearch;
  let fixture: ComponentFixture<MedicineSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineSearch],
      providers: [{ provide: Medicine, useValue: medicineApiMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicineSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
