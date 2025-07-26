import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

// Interface for user
export interface AuthUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private currentUserSubject = new BehaviorSubject<AuthUser | null>(null);
  user$: Observable<AuthUser | null> = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    this.initializeUser(); // ✅ Run on app start
  }

  private initializeUser(): void {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      this.currentUserSubject.next(parsedUser);
    } else {
      this.logout(); // ❌ Token ya user missing
    }
  }

  // Synchronous getter
  get user(): AuthUser | null {
    return this.currentUserSubject.value;
  }

  // Set user and token to localStorage and update subject
  setUser(user: AuthUser, token: string): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    this.currentUserSubject.next(user);
  }

  // Only update user (optional use-case)
  updateUser(user: AuthUser): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Logout = clear state + redirect
  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/authentication/login']);
  }
}
