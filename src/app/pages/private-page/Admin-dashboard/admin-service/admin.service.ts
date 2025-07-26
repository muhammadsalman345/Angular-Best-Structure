import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class  AdminService 
    {
  private apiBaseUrl = 'http://localhost:3000/users'; // ✅ Base URL
  private usersSubject = new BehaviorSubject<any[] | null>(null);

  constructor(private http: HttpClient) {}

  // ✅ Generic API Fetcher (Handles Caching & Refresh) 
  private fetchData(
    endpoint: string,
    subject: BehaviorSubject<any[] | null>,
    id?: number,
    forceRefresh = false,
    params: any = {}
  ): Observable<any[]> {
    let fullUrl = id
      ? `${this.apiBaseUrl}/${endpoint}/${id}` // 🔹 Fetch single user if ID exists
      : `${this.apiBaseUrl}/${endpoint}`;

    if (Object.keys(params).length) {
      // 🔹 Convert params object to query string
      const queryString = new URLSearchParams(params).toString();
      fullUrl += `?${queryString}`;
    }

    if (forceRefresh || !subject.value) {
      this.http
        .get<any>(fullUrl)
        .pipe(
          tap((response) => {
            if (id) {
              subject.next([response]); // Wrap single user in an array
            } else {
              subject.next(response.users || []);
            }
          }),
          catchError((error) => {
            console.error(`API Error (${endpoint}):`, error);
            return throwError(() => new Error(`Failed to fetch ${endpoint}`));
          })
        )
        .subscribe();
    }

    return subject.asObservable().pipe(
      filter((data): data is any[] => data !== null) // ✅ Remove `null` values
    );
  }

  // ✅ Get Users OR Single User (With ID, Caching, Force Refresh, and Pagination)
  getUsers(users:string,id?: number, forceRefresh = false, limit?: number, skip?: number): Observable<any[]> {
    const params: any = {};
    if (limit !== undefined) params.limit = limit;
    if (skip !== undefined) params.skip = skip;

    return this.fetchData(users, this.usersSubject, id, forceRefresh, params);
  }
}
