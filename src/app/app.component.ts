import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'super-set';
  enlace: string = 'http://localhost:8088/superset/dashboard/p/2Oq9abDXzVk/';
}
