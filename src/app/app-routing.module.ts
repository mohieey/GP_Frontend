import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StartComponent } from './components/start/start.component';

const routes: Routes = [
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: StartComponent },
  { path: 'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
