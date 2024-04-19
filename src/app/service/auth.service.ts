import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { User } from '../types';


type LoginResponse = {
  accessToken: string;
}| string
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken: string | null = null;
  user: User | null = null;

  constructor( private http: HttpClient) {
    this.loginFromStorage();
  }

  async register(email: string, password: string): Promise<void> {
    try {
      const res = await this.http.post('/signup', {email, password}).toPromise();
    } catch (error) {
      console.error(error);
      throw new Error('Registration failed. Please try again.');
    }
  }

  async loginFromStorage(): Promise<User | null> {

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken)
      return null;
    this.accessToken = accessToken;
    const payload = accessToken.split('.')[1];
    const payloadDecoded = atob(payload);
    const userRaw = JSON.parse(payloadDecoded) as User;
    this.user = userRaw;
    return userRaw;
  }




  async login(email: string, password: string): Promise<User | string> {
    try {

      const res = await this.http.post<LoginResponse>('/login', {email, password}).toPromise();

      if (typeof res === 'string' || !res )
        throw new Error(res);

      const payload = res.accessToken.split('.')[1];
      const payloadDecoded = atob(payload);
      const userRaw = JSON.parse(payloadDecoded) as User;

      this.user = userRaw;
      this.accessToken = res.accessToken;

      // we add token to local storage
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.getItem('accessToken');

      return userRaw;

    } catch (e: any) {
      console.error(e);
      if (e instanceof HttpErrorResponse)
        return e.error;
      else
        return 'An error occurred';
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
