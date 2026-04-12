import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, NoopAnimationsModule],
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
      'Medz Ivory',
    );
    expect(compiled.querySelectorAll('[data-testid="catalogue-card"]').length).toBe(3);
    expect(
      compiled.querySelector('input[placeholder="Search molecules, protocols, or shelf codes"]'),
    ).not.toBeNull();
  });
});
