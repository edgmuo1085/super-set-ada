import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'super-set';
  //enlace: string = 'https://www.catastroantioquia.co/CentroControl/app/6';
  enlace: string = 'http://localhost:8088/superset/dashboard/p/2Oq9abDXzVk/';
  urlRedirect: SafeResourceUrl = '';
  private readonly domSanitizer = inject(DomSanitizer);

  ngOnInit(): void {
    const urlClean = this.domSanitizer.bypassSecurityTrustResourceUrl(this.enlace);
    this.urlRedirect = urlClean;
  }
}
