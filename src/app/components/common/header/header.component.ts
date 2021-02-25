import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthUser } from '../../../models/auth-user';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogin: boolean;
  user$: Observable<User>;
  firstName: string;
  currentUser$: Observable<User>;
  currentUser: AuthUser;

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

    this.currentUser$ = this.afAuth.authState.pipe(
      map((user: firebase.default.User | null) => {
        if (user) {
          this.currentUser = new AuthUser(user);
          return this.currentUser;
        }
        return null;
      })
    );
    // this.afAuth.authState.pipe(values => {
    //   console.log('displayName: ', values);
    // })
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
    private afAuth: AngularFireAuth,
  ) {}

  closeDialog() {
    this.dialog.closeAll();
  }

  // async closeDialogP(): Promise<void> {
  //   this.dialog.closeAll();
  // }

  // async authLogoutP(): Promise<void> {
  //   this.authService.logout();
  // }

  // async navigateByUrlP(): Promise<void> {
  //   this.router.navigateByUrl('/login');
  // }

  logout() {
    this.authService.logout();
      // .then(() => this.closeDialog())
      // .finally(() => this.router.navigateByUrl('/'));
    this.closeDialog();
    this.router.navigateByUrl('/login');
  }

  logoutP(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.logout();
      this.closeDialog();
    }).then(value => {
      if (!this.afAuth.user)
      this.router.navigateByUrl('/login');
    }).catch(err => {
      console.error(err);
    });

  }    //   this.authLogoutP();
  //   this.closeDialogP();
  //   this.navigateByUrlP();
  //   }



}
