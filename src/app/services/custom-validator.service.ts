import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  // isPasswordError: boolean;
  // passwordConfirmationError: string;

  // constructor() { }

  matchPasswordCheck(password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      const obj = {
        a: 'ther passwords are not matched',
        b: true
      }
      return obj;
        // this.passwordConfirmationError = 'The passwords are not matched.';
        // this.isPasswordError = true;
    } else {
      const obj = {
        a: '',
        b: false
      }
      return obj;
    }

    // const obj = {
    //   a: 'ther passwords are not matched',
    //   b: true
    // }

  }

}


