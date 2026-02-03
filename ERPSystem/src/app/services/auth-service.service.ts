import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaz para la respuesta que esperamos del endpoint de login
export interface LoginResponse {
  Token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const url = `${this.baseUrl}/login`;
    const body = { username, password };
    return this.http.post<LoginResponse>(url, body);
  }

}
