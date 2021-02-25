import { Component, OnInit } from '@angular/core';
import { AngularFireAction, AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../../models/comment';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
// import { AuthUser } from 'src/app/models/auth-user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  users: Observable<User[]>;
  usersRef: AngularFireList<User>;
  commentsRef: AngularFireList<Comment>;
  comments$: Observable<Comment[]>;
  comment = '';
  currentUser: User;
  currentUser$: Observable<User>;
  email: string;

  date: number;

  users$: Observable<AngularFireAction<firebase.default.database.DataSnapshot>[]>;

  constructor(
    private db: AngularFireDatabase,
    // private commentService: CommentService,
    private afAuth: AngularFireAuth


  ) {
    this.usersRef = db.list('/users');
    this.commentsRef = db.list('/comments');

    console.log('this is in constructor');

    // let obj: HTMLElement = document.getElementById('scroll-inner');
    // obj.scrollTop = obj.scrollHeight;
  }

  ngOnInit(): void {
    console.log('this is in ngOnInit()');
    this.currentUser$ = this.afAuth.authState.pipe(
      map((user: firebase.default.User | null) => {
        if (user) {
          this.currentUser = new User(user);
          console.log(this.currentUser.email);
          return this.currentUser;
        } else {
          return null;
        }
      })
    );

    this.currentUser$.subscribe((value) => {
      console.log(value.email);
      console.log(value.firstName);
      console.log(value.uid);
      console.log(value.key);
      this.email = value.email;
    });


    // snapshotchangesにすることでキーを含めたメタデータも取得できる
    this.comments$ = this.commentsRef.snapshotChanges()
    .pipe(
      // AngularFirebase内で準備されているSnapshotActionというInterfaceを型として利用できる
      // Genericにはやり取りするデータ型であるCommentデータを定義する
      map((snapshots: SnapshotAction<Comment>[]) => {
        return snapshots.map(snapshot => {
          const value = snapshot.payload.val();
          // snapshotのpayloadでキー情報を取得できる
          return new Comment({key: snapshot.payload.key, ...value});
        })
      })
    )

    this.users = this.usersRef.snapshotChanges()
    .pipe(
      map((snapshots: SnapshotAction<User>[]) => {
        return snapshots.map(snapshot => {
          const value = snapshot.payload.val();
          return new User({key: snapshot.payload.key, ...value});
        });
      })
    );

    let target: HTMLElement = document.getElementById('scroll-inner');
    target.scrollIntoView(true);



  }

  addComment(comment: string): void {
    if (comment) {
      console.log('comment: ', comment);
      console.log('this.currentUser:', this.email);
      this.commentsRef.push(new Comment({ email: this.email,  message: comment}));
      // this.commentsRef.push(new Comment({ user: this.currentUser,  message: comment}));
      // this.commentsRef.push(new Comment({ authUser: this.currentUser,  message: comment}));
      this.comment = '';
    }
  }





}
