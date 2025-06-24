import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [Footer, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'e-Cap_FrontEnd';
}
