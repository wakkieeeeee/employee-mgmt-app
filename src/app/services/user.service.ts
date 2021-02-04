import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire';
import { UserDetailComponent } from '../components/user/user-detail/user-detail.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersRef!: AngularFireList<User>;


  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private afUser: FirebaseApp,
  ) {
    this.usersRef = this.db.list('/user');
  }

  createUser(email: string, password: string, firstName: string, lastName: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((credential) => {
        // console.log(credential.user.displayName);
        const { user } = credential;
        const actionCodeSettings = {
          url: `http://localhost:4203/?newAccount=true&email=${user.email}`
        };

        user.sendEmailVerification(actionCodeSettings);


        // dbにセット
        this.db.object(`/users/${user.uid}`).set({uid: user.uid, email: user.email, firstName, lastName});

      });
    }

    deleteUser(user: User): void {
      console.log('user.uid: ', user.uid);
      this.db.object('/users/' + user.uid).remove();
    }
}
