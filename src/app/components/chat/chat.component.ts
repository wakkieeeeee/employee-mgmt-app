import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../../models/comment';
import { CommentService } from '../../services/comment.service';
import { AngularFireAuth } from '@angular/fire/auth';

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
  tempEmail: string;

  date: number;



  constructor(
    private db: AngularFireDatabase,
    private commentService: CommentService,
    private afAuth: AngularFireAuth


  ) {
    this.usersRef = db.list('/users');
    this.commentsRef = db.list('/comments');
  }

  ngOnInit(): void {
    // authStateはログインユーザーのログイン情報をobservableで参照可能
    this.afAuth.authState.subscribe((user: firebase.User | null) => {
      if (user) {
        this.currentUser = new User(user);
      }
    });

      // this.afAuth.user.pipe(map(value => {
        //     console.log('tempEmail', value.email);
        //   }));

        this.comments$ = this.commentsRef.snapshotChanges().pipe(
          map((snapshots: SnapshotAction<Comment>[]) => {
            return snapshots.map(snapshot => {
              const value = snapshot.payload.val();
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




    // this.comments = this.commentService.getComment();


  }

  addComment(comment: string): void {
    if (comment) {
      this.commentsRef.push(new Comment({
        user: 'test',
        message: comment
      }))
      this.comment = '';
    }
  }

}
