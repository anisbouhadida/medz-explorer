import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './layout/navbar/navbar';
import { Hero } from './layout/hero/hero';
import { MatIconModule } from '@angular/material/icon';
import { MedicineSearch } from "./features/medicine/medicine-search/medicine-search";

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, NavbarComponent, Hero, MatIconModule, MedicineSearch],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block min-h-screen',
  },
})
export class App {}
