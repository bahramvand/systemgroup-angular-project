import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import userInfo from './costume-type/user-info-type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(true);

  constructor() {
    const { userName, email, authToken } = this.getUserInfoFromLocalStorage();

    if (userName && email && authToken) {
      this.isLoggedInSubject.next(true);
    }
  }

  private getUserInfoFromLocalStorage() {
    const userName = localStorage.getItem('userName');
    const email = localStorage.getItem('email');
    const authToken = localStorage.getItem('authToken');
    return {
      userName,
      email,
      authToken,
    };
  }

  login(userData: userInfo): void {
    localStorage.setItem('authToken', userData.authToken);
    localStorage.setItem('userName', userData.name);
    localStorage.setItem('email', userData.email);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    this.isLoggedInSubject.next(false);
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getUserInfo(): userInfo | null {
    const { userName, email, authToken } = this.getUserInfoFromLocalStorage();
    if (!userName || !email || !authToken) {
      return null;
    }
    return { name: userName, email: email, authToken: authToken };
  }
}
