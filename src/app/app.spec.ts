import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Medicine } from './shared/service/api/medicine';

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

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, NoopAnimationsModule],
      providers: [{ provide: Medicine, useValue: medicineApiMock }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the Medz Ivory archive shell', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('[data-testid="page-title"]')?.textContent).toContain(
      'Explore Data',
    );
    expect(compiled.textContent).toContain('Medz Explorer');
    expect(
      compiled.querySelector('input[placeholder="Search molecules, protocols, or shelf codes"]'),
    ).not.toBeNull();
  });
});
