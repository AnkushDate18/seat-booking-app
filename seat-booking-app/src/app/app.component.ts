import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import {MainComponent } from './main/main.component'


@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seat-booking-app';
  constructor(){}  
}
