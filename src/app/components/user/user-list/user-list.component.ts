import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersRef: AngularFireList<User>;
  users$: Observable<User[]>;
  searchUsers$: Observable<User[]>;

  length: number;
  pageIndex: number = 0;
  perPage: number = 50;
  lowValue: number = 0;
  highValue: number = 50;

  pageEvent: MatPaginator;

  private searchTerm = new Subject<string>();


  constructor(
    private db: AngularFireDatabase,
    private userService: UserService,
    private router: Router,
  ) {
    this.usersRef = db.list('/users');
  }

  search(term: string): void {
    this.searchTerm.next(term);
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

    this.getDataSize();

    // this.searchUsers$ = this.searchTerm.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((term: string) => this.userService.searchUsers(term));
    // )
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

  // For pagination with Google MatPaginator
  public getPaginatorData(event) {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

  // For getting length of the data stored in Realtime Database
  getDataSize() {
    this.db.list('/users').valueChanges().subscribe(
      values => {
        console.log('The total volume of data is ' + values.length);
        this.length = values.length;
      }
    )
  }




}
