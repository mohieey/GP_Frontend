import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './start/start.component';
import { SignUpComponent } from './AuthComponents/sign-up/sign-up.component';
import { LoginComponent } from './AuthComponents/login/login.component';
import { ResetPasswordComponent } from './AuthComponents/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './AuthComponents/forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { TweetComponent } from './tweet/tweet.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    SignUpComponent,
    LoginComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    HomeComponent,
    FooterComponent,
    TweetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
