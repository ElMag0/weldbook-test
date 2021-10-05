import {Inject, Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Environment, ENVIRONMENT} from "@app/core/environment";

@Injectable({providedIn: "root"})
export class ApiService {
  private readonly apiUrl = this.environment.apiUrl

  constructor(
    @Inject(ENVIRONMENT)
    private readonly environment: Environment,
    private readonly http: HttpClient
  ) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  public get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  public put<T>(path: string, body: Object = {}): Observable<T> {
    return this.http.put<T>(
      `${this.apiUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  public post<T>(path: string, body: Object = {}): Observable<T> {
    return this.http.post<T>(
      `${this.apiUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  public delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(
      `${this.apiUrl}${path}`
    ).pipe(catchError(this.formatErrors));
  }
}
