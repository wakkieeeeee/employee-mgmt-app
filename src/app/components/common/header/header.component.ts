import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      console.log('This is the ngOnInit() in headerComponent', user);
      this.isLogin = !!user
    })
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }


  // logout(): void {
  //   this.authService.logout()
  //     .then(() => {this.router.navigateByUrl('/logout')});
  // }

}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
  ) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  logout() {
    this.router.navigateByUrl('/');
    this.authService.logout();
      // .then(() => this.closeDialog())
      // .finally(() => this.router.navigateByUrl('/'));
    this.closeDialog();
  }
}
