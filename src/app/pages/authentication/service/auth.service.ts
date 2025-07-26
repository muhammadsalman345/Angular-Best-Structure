import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router,private _SnackbarService:SnackbarService) {

    console.log("AuthService called");
    
  }

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Add auth token if available
    const Token = localStorage.getItem('token');
    if (Token) {
      return headers.set('Authorization', `Bearer ${Token}`);
    }
    return headers;
  }

private handleError(error: HttpErrorResponse) {
  // Extract message from backend response
  const errorMsg =
    error.error?.message || // ✅ "Email already registered"
    error.message ||        // fallback
    'Something went wrong';

  // Show to user
  this._SnackbarService.error(errorMsg);

  if (error.status === 401) {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

  return throwError(() => new Error(errorMsg));
}


  // Generic GET
  get<T>(endpoint: string, params?: any): Observable<T> {
    debugger
    return this.http.get<ApiResponse<T>>(
      `${this.API_BASE_URL}/${endpoint}`,
      { 
        headers: this.getHeaders(),
        params: new HttpParams({ fromObject: params }),
      }
    ).pipe(
      map(response => response.data),
    catchError(this.handleError.bind(this))
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
     catchError(this.handleError.bind(this))
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
      catchError(this.handleError.bind(this))
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
       catchError(this.handleError.bind(this))
    );
  }

  // Generic DELETE
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<ApiResponse<T>>(
      `${this.API_BASE_URL}/${endpoint}`,
      { headers: this.getHeaders() }
    ).pipe(
      map(response => response.data),
     catchError(this.handleError.bind(this))
    );
  }
}