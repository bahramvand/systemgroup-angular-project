import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import userRole from './costume-type/user-role';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    const authToken = this.getAuthTokenFromLocalStorage();
    const userRoleTag = this.getUserRole();
    if (authToken && userRoleTag) {
      this.isLoggedInSubject.next(true);
      this.isAdminSubject.next(userRoleTag === 'Admin');
    }
  }

  private getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  private getAuthTokenFromLocalStorage(): string | null {
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

            this.getCurrentUser().subscribe({
              next: (user) => {
                const role: userRole = user.role;
                localStorage.setItem(
                  'userRole',
                  role === userRole.Admin ? 'Admin' : 'User'
                );
                this.isAdminSubject.next(role === userRole.Admin);
                observer.next(token);
                observer.complete();
              },
              error: (err) => {
                observer.error(err);
              },
            });
          },
          error: (err) => {
            observer.error(err);
          },
        });
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  isAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }


  // ===================================================

  getCurrentUser(): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http.get(`${this.apiUrl}/users/current`, {
      headers: { authorization: authToken },
    });
  }

  isLoggedInAndAdmin(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable().pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          return false;
        }
        return this.getUserRole() === 'Admin';
      })
    );
  }

  getUsers(): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      return throwError(() => new Error('User is not authenticated'));
    }
    return this.http.get(`${this.apiUrl}/users`, {
      headers: {
        authorization: authToken,
      },
    });
  }

  editUser(data: any): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http.put(`${this.apiUrl}/users`, data, {
      headers: { authorization: authToken },
    });
  }

  createUser(data: any): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http.post(`${this.apiUrl}/users`, data, {
      headers: { authorization: authToken },
    });
  }


  deleteUser(productId: number): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http.delete(`${this.apiUrl}/users/${productId}`, {
      headers: { authorization: authToken },
    });
  }

  
  // ===================================================

  deleteProduct(productId: number): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http.delete(`${this.apiUrl}/products/${productId}`, {
      headers: { authorization: authToken },
    });
  }

  getProduct(productId: number): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http.get(`${this.apiUrl}/products/${productId}`, {
      headers: { authorization: authToken },
    });
  }

  getProducts(): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http.get(`${this.apiUrl}/products`, {
      headers: { authorization: authToken },
    });
  }
  
  createProduct(data: any): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http.post(`${this.apiUrl}/products`, data, {
      headers: { authorization: authToken },
    });
  }

  editProduct(data: any): Observable<any> {
    const authToken = this.getAuthTokenFromLocalStorage();
    if (!authToken) {
      return throwError(() => new Error('User is not authenticated'));
    }

    return this.http.put(`${this.apiUrl}/products`, data, {
      headers: { authorization: authToken },
    });
  }
}
