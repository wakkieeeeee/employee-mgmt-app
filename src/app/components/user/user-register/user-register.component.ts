import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    console.log(form.value);

    const { email, firstName, lastName } = form.value;
    const uid: string = undefined;
    const user: User = { email, firstName, lastName, uid };

    // this.userService.createUser(user);
    this.router.navigateByUrl('/');

  }

}
