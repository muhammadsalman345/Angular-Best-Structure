import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {

    console.log("AuthService called");
    
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Add auth token if available
    const token = localStorage.getItem('auth_token');
    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 401) {
      localStorage.removeItem('auth_token');
      this.router.navigate(['/auth/login']);
    }
    
    const errorMsg = error.error?.message || error.message || 'Something went wrong';
    return throwError(() => new Error(errorMsg));
  }

  // Generic GET
  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<ApiResponse<T>>(
      `${this.API_BASE_URL}/${endpoint}`,
      { 
        headers: this.getHeaders(),
        params: new HttpParams({ fromObject: params })
      }
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Generic POST
  post<T>(endpoint: string, body: any): Observable<T> {
    debugger
    return this.http.post<ApiResponse<T>>(
      `${this.API_BASE_URL}/${endpoint}`,
      body,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Generic PUT
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<ApiResponse<T>>(
      `${this.API_BASE_URL}/${endpoint}`,
      body,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Generic PATCH
  patch<T>(endpoint: string, body: any): Observable<T> {
    return this.http.patch<ApiResponse<T>>(
      `${this.API_BASE_URL}/${endpoint}`,
      body,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  // Generic DELETE
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<ApiResponse<T>>(
      `${this.API_BASE_URL}/${endpoint}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }
}