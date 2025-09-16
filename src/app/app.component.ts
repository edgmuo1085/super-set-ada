import { Component, inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { ServicesService } from './components/services/services.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'super-set';
  //enlace: string = 'https://catastro.rionegro.gov.co/';
  enlace: string = 'http://localhost:8088/superset/dashboard/p/2Oq9abDXzVk/';
  urlRedirect: SafeResourceUrl = '';
  private readonly domSanitizer = inject(DomSanitizer);
  private readonly services = inject(ServicesService);

  ngOnInit(): void {
    const urlClean = this.domSanitizer.bypassSecurityTrustResourceUrl(this.enlace);
    this.urlRedirect = urlClean;
    //this.embed();
  }

  async login() {
    try {
      return firstValueFrom(this.services.login({ username: 'admin', password: 'admin' }));
    } catch (err) {
      console.error(err);
    }
  }

  embed() {
    embedDashboard({
      id: 'abc123', // given by the Superset embedding UI
      supersetDomain: 'https://superset.example.com',
      mountPoint: document.getElementById('my-superset-container') as HTMLDivElement, // any html element that can contain an iframe
      fetchGuestToken: () => this.login(),
      dashboardUiConfig: {
        // dashboard UI config: hideTitle, hideTab, hideChartControls, filters.visible, filters.expanded (optional), urlParams (optional)
        hideTitle: true,
        filters: {
          expanded: true,
        },
        urlParams: {
          foo: 'value1',
          bar: 'value2',
          // ...
        },
      },
      // optional additional iframe sandbox attributes
      iframeSandboxExtras: ['allow-top-navigation', 'allow-popups-to-escape-sandbox'],
      // optional config to enforce a particular referrerPolicy
      referrerPolicy: 'same-origin',
    });
  }
}
