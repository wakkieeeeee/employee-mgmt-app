export class AuthUser {
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
  // initial: string;

  constructor(authUser: AuthUser | firebase.default.User) {
    this.uid = authUser.uid;
    this.displayName = authUser.displayName;
    this.email = authUser.email;
    this.photoURL = authUser.photoURL;
    // this.initial = authUser.displayName.slice(0, 1);


  }
}
