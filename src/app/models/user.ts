export class User {
  firstName: string;
  lastName: string;
  email: string;
  uid: string;
  key?: string;

  constructor(user: User) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.uid = user.uid;
    if (user.key) {
      this.key = user.key;
    }
  }
}
