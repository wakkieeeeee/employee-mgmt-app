import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginSuccess: boolean;
  errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const { email, password } = form.value;

    this.authService.login(email, password)
      .then(() => this.router.navigateByUrl('/'))
      // .finally(() => {
      //   this.isLoginSuccess = this.authService.userStatus.isLoginSuccess,
      //   this.errorMessage = this.authService.userStatus.errorMessage
      //   // this.errorMessage = userStatus.errorMessage,
      // });
  }
}
