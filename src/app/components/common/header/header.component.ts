import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AngularFireDatabase } from '@angular/fire/database';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;
  user$: Observable<User>;
  firstName: string;

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      console.log('This is the ngOnInit() in headerComponent', user);
      this.isLogin = !!user
    })

    this.afAuth.currentUser.then(values => {
      console.log('displayName: ', values);
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
