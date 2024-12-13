import { Component } from '@angular/core';
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
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

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
    MatIcon,
    NgClass,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private auth: AuthenticationService, private rout: Router) {}

  loginFormControl: FormGroup<{
    emailFormControl: FormControl<string>;
    nameFormControl: FormControl<string>;
  }> = new FormGroup({
    emailFormControl: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
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
      const userData = {
        name: this.loginFormControl.controls['nameFormControl'].value,
        email: this.loginFormControl.controls['emailFormControl'].value,
        authToken: '1234567890',
      };
      this.auth.login(userData);
      this.rout.navigate(['']);
    } else {
      console.log(this.loginFormControl.valid);
    }
  }
}
