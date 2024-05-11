import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LoginResult } from './login-result';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public tokenKey: string = "tokenKey";
  private _authstatus = new BehaviorSubject<boolean>(false);
  public authstatus = this._authstatus.asObservable(); 

  init():void {
    if(this.isAuthenticated() === true){
      this.setAuthStatus(true);
    }
  }
  private setAuthStatus (isAuthenticated: boolean): void {
    this._authstatus.next(isAuthenticated);
  }

  isAuthenticated():boolean { //identify whether the token exists or not
    return this.getToken() !== null;
  } 

  constructor(protected http:HttpClient) { }
  //login function(service)
  login(item:LoginRequest): Observable<LoginResult>{
    let url = `${environment.baseUrl}api/Admin/Login`;
    return this.http.post<LoginResult>(url, item)
    .pipe(tap(loginResult => {
      if (loginResult.success){
        localStorage.setItem(this.tokenKey, loginResult.token);
        this.setAuthStatus(true);
      }
    }
      
    ));
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }
  logout(): void{
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
  }  
}
