import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (authToken) {
      this.isLoggedInSubject.next(true);
    }
  }

  getAuthTokenFromLocalStorage(): string | null {
    return localStorage.getItem('authToken');
  }

  login(username: string, password: string): Observable<string> {
    const loginData = { username, password };
    return new Observable((observer) => {
      this.http
        .post(`${this.apiUrl}/auth`, loginData, { responseType: 'text' })
        .subscribe({
          next: (token: string) => {
            localStorage.setItem('authToken', token);
            this.isLoggedInSubject.next(true);
            observer.next(token);
            observer.complete();
          },
          error: (err) => {
            observer.error(err);
          },
        });
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getCurrentUser(): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      throw new Error('User is not authenticated');
    }

    return this.http.get(`${this.apiUrl}/users/current`, {
      headers: { authorization: authToken },
    });
  }
}
