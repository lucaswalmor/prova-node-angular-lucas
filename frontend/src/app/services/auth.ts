import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
  }

  register(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/register`, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
  }
}