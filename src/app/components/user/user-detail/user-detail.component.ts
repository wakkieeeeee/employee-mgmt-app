import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user$: Observable<User>;
  // let database = firebase.database();

  constructor(
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.user$ = this.db.object<User>(`/users/${id}`).valueChanges(); // データを取得するだけなので、valueChangesを使っている

  }
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  editConfirm(firstName: string, lastName: string, uid: string): void {
    const dbFirstName = firstName;
    const dbLastName = lastName;
    const dbUid = uid;
    // const id = this.route.snapshot.paramMap.get('id');
    // this.user$ = this.db.object<User>(`/users/${id}`).valueChanges();

    console.log(dbUid, dbFirstName, dbLastName);
    // this.db.object(`/users/${dbUid}`).set({firstName: dbFirstName, lastName: dbLastName});
    this.db.list('/users').update(`${dbUid}`, {firstName: dbFirstName, lastName: dbLastName});

    // const userList$ = this.db.list(`/users/${dbUid}`).valueChanges();
    // userList$.subscribe(a => {
    //   const dbFirstName2 = a.values();
    //   console.log(dbFirstName2);
    // })

  }
}
