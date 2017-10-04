import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  isLoggedIn() {
    return tokenNotExpired();
    // const jwtHelper = new JwtHelper();
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return false;
    // }
    // const expirationDate = jwtHelper.getTokenExpirationDate(token);
    // const isExpired = jwtHelper.isTokenExpired(token);
    // console.log(expirationDate);

    // return !isExpired;
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(credentials) {
    return this.http.post('/api/authenticate', {credentials: credentials})
      .map(response => {
        const result = response.json();
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      });
  }

}
