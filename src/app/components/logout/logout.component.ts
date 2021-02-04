import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.redirect();
  }

  redirect = async function(): Promise<void> {
    await setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 3000);
  }
}
