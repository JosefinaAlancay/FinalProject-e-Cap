import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from "./components/footer/footer";
import { Stats } from './components/stats/stats';
import { Instructor } from './components/instructor/instructor';
import { Navbar } from "./components/navbar/navbar";
import { CourseList } from "./components/course-list/course-list";

@Component({
  selector: 'app-root',
  imports: [Footer, Stats, Instructor, Navbar, Header, CourseList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'e-Cap_FrontEnd';
}