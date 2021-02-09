export class User {
  firstName: string;
  lastName: string;
  displayName: String;
  email: string;
  photoURL: string;
  uid: string;
  key?: string;

  // constructor(user: User) {
  constructor(user: firebase.User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.uid = user.uid;
    if (user.key) {
      this.key = user.key;
    }
  }
}
