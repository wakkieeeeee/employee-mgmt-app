import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentRef: AngularFireList<Comment>;
  comment$: Comment;
  currentUser: User;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,

  ) {
    this.commentRef = this.db.list('/comments');
  }

  getComment(): Observable<Comment[]>{
    return this.commentRef.valueChanges();

  };

  addComment(comment: string) {



  };


}
