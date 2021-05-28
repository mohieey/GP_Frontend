import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { usernamePatternValidation } from 'src/app/validations/patternMatcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthenticationService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  loginForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, usernamePatternValidation(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
  });


  invalidEmailOrPassword: boolean = false;

  onSubmit() {
    this._authService.login(this.loginForm.value).subscribe(
      response => {

        localStorage.setItem('token', response.body['token'])
        localStorage.setItem('currentUser', JSON.stringify(response.body))
        this.invalidEmailOrPassword = false;
        this.router.navigate(['/home'])

      }
      , err => {
        this.invalidEmailOrPassword = true;
      })
  }


}
