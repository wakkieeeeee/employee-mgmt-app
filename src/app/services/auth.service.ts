// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import { WebapiLoginCredential } from '../models/webapi-login-credential';
// import 'rxjs/add/operator/toPromise';
// import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSuccess: boolean;
  errorMessage: string;
  userStatus: {isLoginSuccess: boolean, errorMessage: string};

  constructor(
    private afAuth: AngularFireAuth,
    // private http: HttpClient
  ) { }


  login(email: string, password:string): Promise<any | void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.error('authService Error: ', error);
        this.userStatus = {
          isLoginSuccess: false,
          errorMessage: 'wrong credntials'
        }
      })
      .finally(() => {return this.userStatus});
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  // public webapiLogin(webapiLoginCredential: WebapiLoginCredential): Promise<string> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     })
  //   };

  // return this.http.post('/api/login', webapiLoginCredential, httpOptions)
  //   .toPromise()
  //   .then((result: any) => {
  //     if (result.result === 'success') {
  //       const expiresAt = moment().add(result.token, 'second');
  //       localStorage.setItem('id_token', result.token);
  //       localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

  //       return result.result;
  //     } else {
  //       return Promise.reject(result.message);
  //     }
  //   }).catch((err: any) => {
  //     return Promise.reject(err.statusText);
  //   });
  // }

  // webapiLogout() {
  //   localStorage.removeItem('id_token');
  //   localStorage.removeItem('expires_at');
  // }

  // isWebapiLogin(): boolean {
  //   return moment().isBefore(this.getExpiration());
  // }

  // getAuthHeader(): string {
  //   const token = localStorage.getItem('id_token');

  //   if (token) {
  //     return 'Bearer ' + token;
  //   } else {
  //     undefined;
  //   }
  // }

  // private getExpiration(): moment.Moment {
  //   const expiration = localStorage.getItem('expires_at');
  //   const expiresAt = JSON.parse(expiration);

  //   return moment(expiresAt);
  // }
}
