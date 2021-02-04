import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoginSuccess: boolean;
  errorMessage: string;
  userStatus: {isLoginSuccess: boolean, errorMessage: string};

  constructor(
    private afAuth: AngularFireAuth,
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
}
