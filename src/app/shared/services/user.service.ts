import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {ApiService} from './api.service';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(private api: ApiService, private jwtService: JwtService) {
  }

  populate(): void {
    if (this.jwtService.getToken()) {
      this.api.get<{ user: User }>('/user').subscribe(
        data => this.setAuth(data.user),
        _ => this.purgeAuth()
      );
    }
  }

  setAuth(user: User): void {
    this.jwtService.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: AuthType, credentials: { email: string, password: string, username?: string}): Observable<User> {
    const url = type === AuthType.Register ? '/auth/register' : '/auth/login';
    return this.api.post<User>(url, { user: credentials}).pipe(map(data => {
      this.setAuth(data);
      return data;
    }));
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }
}

export enum AuthType {
  Register, Login
}
