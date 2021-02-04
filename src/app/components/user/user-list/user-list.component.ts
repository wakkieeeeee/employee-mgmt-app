import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersRef: AngularFireList<User>
  users$: Observable<User[]>;

  constructor(
    private db: AngularFireDatabase,
    private userService: UserService,
    private router: Router,
  ) {
    this.usersRef = db.list('/users');
  }

  ngOnInit(): void {
    this.users$ = this.usersRef.snapshotChanges()
      .pipe(
        map((snapshots: SnapshotAction<User>[]) => {
          return snapshots.map(snapshot => {
            const value = snapshot.payload.val();
            console.log(snapshot.payload.key);
            return new User({key: snapshot.payload.key, ...value});
          });
        })
      );
  }

  deleteUser(user : User): void {
    this.userService.deleteUser(user);
    if (!user) {
      alert("The user was deleted successfully");
      this.router.navigateByUrl('/');
    } else {
      alert('The user was not deleted.');
    }
  }

}
