import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Precio } from '../demo/models/precio';
import { Categoria } from '../demo/models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private baseUrl = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any[]> {
    // Nota: En una aplicación real, el token debería obtenerse dinámicamente desde un servicio de autenticación o almacenamiento local.
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.get<Categoria[]>(this.baseUrl, { headers });
  }
}
