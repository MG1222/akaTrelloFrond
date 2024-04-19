import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from '../types';

type LoginResponse = {
  accessToken: string;
} | string

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken: string | null = null;
  user: User | null = null;

  constructor(private http: HttpClient) {
    this.loginFromStorage();
  }

  async register(email: string, password: string): Promise<void> {
    await this.http.post('/signup', { email, password }).toPromise();
  }

  async loginFromStorage(): Promise<User | null> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return null;
    this.accessToken = accessToken;
    this.user = this.decodeToken(accessToken);
    return this.user;
  }

  private decodeToken(token: string): User {
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    return JSON.parse(payloadDecoded) as User;
  }

  async login(email: string, password: string): Promise<User | string> {
    try {
      const res = await this.http.post<LoginResponse>('/login', { email, password }).toPromise();
      if (typeof res === 'string' || !res) throw new Error('Invalid response from server');
      this.user = this.decodeToken(res.accessToken);
      this.accessToken = res.accessToken;
      localStorage.setItem('accessToken', res.accessToken);
      return this.user;
    } catch (e: any) {
      console.error(e);
      return e instanceof HttpErrorResponse ? e.error : 'An error occurred';
    }
  }

  isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  logout(): void {
    this.accessToken = null;
    this.user = null;
    localStorage.removeItem('accessToken');
  }
}