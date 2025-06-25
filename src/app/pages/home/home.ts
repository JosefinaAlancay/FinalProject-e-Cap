import { Component } from '@angular/core';
import { Stats } from '../../components/stats/stats';
import { Instructor } from '../../components/instructor/instructor';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Stats, Instructor, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {}
