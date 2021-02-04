import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CustomValidatorService } from '../../services/custom-validator.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  isPasswordError: boolean;
  passwordConfirmationError: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private customValidatorService: CustomValidatorService,
  ) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const { email, password, confirmPassword, firstName, lastName } = form.value;

    const checkResult = this.customValidatorService.matchPasswordCheck(password, confirmPassword);
    this.passwordConfirmationError = checkResult.a;
    this.isPasswordError = checkResult.b;

    if (this.isPasswordError===true) {
      console.log('isPasswordError flag is on');
    } else {
      this.userService.createUser(email, password, firstName, lastName)
        .then(() => this.router.navigateByUrl('/signup-confirmation'));
    }


  }



}
