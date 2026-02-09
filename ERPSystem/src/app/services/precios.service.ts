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

  // Método privado para centralizar la configuración de headers
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `${token}`, // Agregamos Bearer por estándar de tus CURLs
      'Content-Type': 'application/json'
    });
  }

  getPrecios(): Observable<Precio[]> {
    return this.http.get<Precio[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  createPrecio(precio: Precio): Observable<Precio> {
    const url = `${this.baseUrl}/create`;
    const { id, ...data } = precio;
    return this.http.post<Precio>(url, data, { headers: this.getHeaders() });
  }

  // --- NUEVOS MÉTODOS ---

  /**
   * Actualiza un precio existente
   * @param id El ID del precio a modificar
   * @param precio Los datos actualizados
   */
  updatePrecio(id: number, precio: Precio): Observable<Precio> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.http.put<Precio>(url, precio, { headers: this.getHeaders() });
  }

  /**
   * Elimina un precio por ID
   * @param id El ID del precio a borrar
   */
  deletePrecio(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url, { headers: this.getHeaders() });
  }
}
