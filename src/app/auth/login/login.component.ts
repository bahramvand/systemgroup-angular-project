import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthenticationService } from '../../authentication.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import userInfoForLogin from '../../costume-type/user-info-type';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgClass,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private auth: AuthenticationService, private rout: Router) {}

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  loginFormControl: FormGroup<{
    passowrd: FormControl<string>;
    nameFormControl: FormControl<string>;
  }> = new FormGroup({
    passowrd: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    nameFormControl: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  matcher = new MyErrorStateMatcher();

  onSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (this.loginFormControl.valid) {
      const username = this.loginFormControl.controls.nameFormControl.value;
      const passowrd = this.loginFormControl.controls.passowrd.value;

      this.auth.login(username, passowrd).subscribe({
        next: (token) => {
          console.log('Logged in successfully', token);
          this.rout.navigate(['']);
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });
    } else {
      // console.log(this.loginFormControl.valid);
    }
  }
}
