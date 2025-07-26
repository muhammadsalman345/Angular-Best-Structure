import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
// src/app/core/models/user.model.ts
export interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
  token?: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth/signin';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router,

    
  ) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

login(credentials: { email: string; password: string }) {
  return this.http
    .post<{
      status: boolean;
      message: string;
      data: {
        token: string;
        redirectPath: string;
        user: User;
      };
    }>(
      this.apiUrl,
      credentials,
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true,
      }
    )
    .pipe(
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => error);
      })
    )
    .subscribe((response) => {
      const { token, user, redirectPath } = response.data;
      this.setSession(token, user);
      this.router.navigate([redirectPath]); // Dynamic route from backend
    });
}



  logout() {
    localStorage.clear();
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setSession(token: string, user: User) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
