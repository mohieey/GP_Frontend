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
<<<<<<< HEAD
import { UserProfileComponent } from './user-profile/user-profile.component';
=======
import { PostTweetComponent } from './post-tweet/post-tweet.component';
import { TweetComponent } from './TweetComponents/tweet/tweet.component';
import { TweetDetailsComponent } from './TweetComponents/tweet-details/tweet-details.component';
>>>>>>> 348cb52b277742b8afd83af26e1266d9369623be

const routes: Routes = [
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: StartComponent },
  { path: 'signup', component: SignUpComponent },
  //{ path: 'tweets/:id', component: TweetDetailsComponent },
  {
    path: 'home/:page', component: HomeComponent
    // , children: [
    //   {
    //     path: 'post', // child route path
    //     component: PostTweetComponent, // child route component that the router renders
    //   },
    //   {
    //     path: '', // child route path
    //     component: TweetComponent, // child route component that the router renders
    //   }
    // ]
  },
  { path: 'setting', component: SettingsComponent },
  { path: 'search', component: SearchResultComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '**', component: StartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
