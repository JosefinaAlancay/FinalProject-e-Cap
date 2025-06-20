import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from "./components/footer/footer";
import { Stats } from './components/stats/stats';
import { Instructor } from './components/instructor/instructor';

@Component({
  selector: 'app-root',
  imports: [Header, Footer, Stats, Instructor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'e-Cap_FrontEnd';
}
