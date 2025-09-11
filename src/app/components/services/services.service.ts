import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginModel } from '../models/login';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private readonly http: HttpClient = inject(HttpClient);

  login(body: LoginModel) {
    const url = `${environment.VITE_API_BASE_URL}/login`;
    return this.http.post<any>(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
