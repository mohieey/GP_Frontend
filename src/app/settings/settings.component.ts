import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService } from '../shared/services/account.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { PatternValidation } from '../shared/validations/patternMatcher';
import { UpdateUserDTO } from '../shared/_interfaces/updateUserDTO.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingForm: FormGroup;
  invalidEmailOrPassword: boolean = false;

  constructor(
    private _authService: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private _accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.settingForm = this.fb.group({
      username: [{value: '', disabled: true}, [Validators.required, Validators.minLength(5)]],
      firstname: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.minLength(5)]],
      email: [
        '',
        [
          Validators.required,
          PatternValidation(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
    });
    this._accountService
      .getCurrentUser('georg5000@gmail.com')
      .pipe(first())
      .subscribe(
        (data) => {
          this.settingForm.setValue({
            username: data.userName,
            email: data.email,
            firstname: data.firstName,
            lastname: data.lastName,
          });
        },
        (error) => {
          // this.error = error;
          // this.loading = false;
        }
      );
  }

  get firstname() {
    return this.settingForm.get('firstname');
  }
  get lastname() {
    return this.settingForm.get('lastname');
  }
  get username() {
    return this.settingForm.get('username');
  }
  get email() {
    return this.settingForm.get('email');
  }

  onSubmit() {
    let updateUserDTO: UpdateUserDTO = {
      firstName: this.firstname.value,
      lastName: this.lastname.value,
      email: this.email.value,
    };
    this._accountService
      .updateUser(this.username.value, this.settingForm.value)
      .subscribe(
        (response) => {
          this.invalidEmailOrPassword = false;
          this.router.navigate(['/home']);
        },
        (err) => {
          this.invalidEmailOrPassword = true;
        }
      );
  }
}
