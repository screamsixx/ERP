import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../demo/models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private baseUrl = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) { }

  // Helper para obtener los headers con el token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `${token}`, // Añadido 'Bearer ' por estándar de tus curls
      'Content-Type': 'application/json'
    });
  }

  // GET: Obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.baseUrl, { headers: this.getHeaders() });
  }

  // POST: Crear una categoría
  createCategoria(categoria: Partial<Categoria>): Observable<Categoria> {
    const url = `${this.baseUrl}/create`;
    return this.http.post<Categoria>(url, categoria, { headers: this.getHeaders() });
  }

  // PUT: Actualizar una categoría
  updateCategoria(id: number, categoria: Partial<Categoria>): Observable<Categoria> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.http.put<Categoria>(url, categoria, { headers: this.getHeaders() });
  }

  // DELETE: Eliminar una categoría
  // Nota: Tus curls muestran /update/{id} para borrar, lo cual es inusual,
  // pero lo he dejado tal cual pediste en el comando.
  deleteCategoria(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }
}
