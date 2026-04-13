import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-hero',
  imports: [MatChipsModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {}
