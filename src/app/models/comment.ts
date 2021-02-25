import { AuthUser } from './auth-user';
import { User } from './user';
import { DialogElementsExampleDialog } from '../components/common/header/header.component';

export class Comment {

  // user: User;
  email: string;
  message: string;
  date: number;
  key?: string;
  isEdit: boolean;

  constructor(value: any) {
    // this.user = value.User;
    this.email = value.email;
    this.message = value.message;
    this.date = value.date || Date.now();
    if (value.key) {
      this.key = value.key;
    }
  }

}
