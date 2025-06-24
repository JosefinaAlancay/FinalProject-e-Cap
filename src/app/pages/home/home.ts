import { Component } from '@angular/core';
import { Stats } from '../../components/stats/stats';
import { Instructor } from '../../components/instructor/instructor';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Stats, Instructor],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}
