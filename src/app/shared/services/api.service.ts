import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../../environments/environment';
import {JwtService} from './jwt.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private jwtService: JwtService) {
  }

  private setHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    if (this.jwtService.getToken()) {
      headers.append('Authorization', `Bearer ${this.jwtService.getToken()}`);
    }
    return headers;
  }

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${environment.api_url}${path}`, {headers: this.setHeaders(), params});
  }

  put<T>(path: string, body: any = {}): Observable<T> {
    return this.http.put<T>(`${environment.api_url}${path}`, body, {headers: this.setHeaders()});
  }

  post<T>(url: string, body: any = {}): Observable<T> {
    return this.http.post<T>(`${environment.api_url}${url}`, body, {headers: this.setHeaders()});
  }

  delete<T>(path): Observable<T> {
    return this.http.delete<T>(`${environment.api_url}${path}`, { headers: this.setHeaders() });
  }
}
