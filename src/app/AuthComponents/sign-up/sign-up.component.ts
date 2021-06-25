import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { TokenService } from '../../shared/services/token.service';
import { PatternValidation } from '../../shared/validations/patternMatcher';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private loginService: AuthenticationService, private fb: FormBuilder, private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
  }

  isDarkModeEnabled = () => window.localStorage.getItem('darkmode') == 'dark';

  get firstname() {
    return this.signupform.get('firstname');
  }
  get lastname() {
    return this.signupform.get('lastname');
  }
  get username() {
    return this.signupform.get('username');
  }
  get email() {
    return this.signupform.get('email');
  }
  get password() {
    return this.signupform.get('password');
  }


  signupform = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(5)]],
    lastname: ['', [Validators.required, Validators.minLength(5)]],
    username: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required]],
    email: ['', [Validators.required, PatternValidation(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
  });


  invalidEmailOrPassword: boolean = false;

  onSubmit() {
    this.loginService.signup(this.signupform.value).subscribe(
      response => {
        this.tokenService.saveToken(response.body['token']);
        console.log(response.body['token'])
        this.tokenService.saveUser(response.body);
        console.log(response.body)
        this.invalidEmailOrPassword = false;
        this.router.navigate(['/home'])

      }
      , err => {
        this.invalidEmailOrPassword = true;
      })
  }

}
