import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './AuthComponents/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './AuthComponents/login/login.component';
import { ResetPasswordComponent } from './AuthComponents/reset-password/reset-password.component';
import { SignUpComponent } from './AuthComponents/sign-up/sign-up.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SettingsComponent } from './settings/settings.component';
import { StartComponent } from './start/start.component';

const routes: Routes = [
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: StartComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'setting', component: SettingsComponent },
  { path: 'search', component: SearchResultComponent },
  { path: '**', component: StartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
