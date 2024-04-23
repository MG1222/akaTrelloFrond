import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { User } from '../types';
type LoginResponse = {
  token: string;
} | string

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;
  user: User | null = null;

  constructor(private http: HttpClient) {
    this.loginFromStorage();
  }

  async register(email: string, password: string): Promise<void> {

    const username = email.split('@')[0];
    console.log(username + ' username');
    try {
      const res = await this.http.post('/user/signup', {username, email, password}).toPromise();
      console.log(res + ' res');
      console.log(res)

    } catch (error) {
      console.error(error);
      throw new Error('Registration failed. Please try again.');
    }

  }

  async loginFromStorage(): Promise<User | null> {
    const token = localStorage.getItem('token');
    if (!token) return null;
    this.token = token;
    this.user = this.decodeToken(token);
    return this.user;
  }

  private decodeToken(token: string): User {
    const payloadDecoded = atob(token);
    return JSON.parse(payloadDecoded) as User;
  }

  async login(email: string, password: string): Promise<User | string> {
    try {
      const username = email.split('@')[0];
      const res = await this.http.post<LoginResponse>('/user/login', {username, password}).toPromise();

      if (typeof res === 'string' || !res )
        throw new Error(res);
      console.log(res, 'res');
      console.log(res.token, 'token'); // Access the token here

      this.user = this.decodeToken(res.token);
      this.token = res.token;

      // we add token to local storage
      localStorage.setItem('token', res.token);
      localStorage.getItem('token');

      return this.user;

    } catch (e: any) {
      console.error(e);
      if (e instanceof HttpErrorResponse)
        return e.error;
      else
        return 'An error occurred';
    }

  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logout(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
  }
}