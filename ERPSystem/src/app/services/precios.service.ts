import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Precio } from '../demo/models/precio';

@Injectable({
  providedIn: 'root'
})
export class PreciosService {

  private baseUrl = 'http://localhost:8080/api/precios';

  constructor(private http: HttpClient) { }

  getPrecios(): Observable<any[]> {
    // Nota: En una aplicación real, el token debería obtenerse dinámicamente desde un servicio de autenticación o almacenamiento local.
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.get<Precio[]>(this.baseUrl, { headers });
  }
}
