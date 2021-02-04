import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { UserListComponent } from './components/user/user-list/user-list.component';
// import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupConfirmationComponent } from './components/signup-confirmation/signup-confirmation.component';
import { AuthGuard } from './guards/auth.guard';
import { Auth2Guard } from './guards/auth2.guard';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';

const routes: Routes = [
  // { path: '', component: UserListComponent, canActivate: [Auth2Guard]}
  { path: '', component: UserListComponent, canActivate: [Auth2Guard] },
  { path: '', redirectTo: '/userlist', pathMatch:'full'},
  // { path: 'user-register', component: UserRegisterComponent },
  // { path: 'user/user-detail', component: UserDetailComponent },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [Auth2Guard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: 'signup-confirmation', component: SignupConfirmationComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
