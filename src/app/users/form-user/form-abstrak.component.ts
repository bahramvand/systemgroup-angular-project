import { signal } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import lengthValidator from '../../../validator/lenght-validator';

class MyErrorStateMatcher implements ErrorStateMatcher {
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

export default abstract class FormUser {
  constructor() {}

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // فرم برای ویرایش یا اضافه کردن کاربر
  editFormControl: FormGroup<{
    username: FormControl<string>;
    role: FormControl<string>;
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    mobile: FormControl<string>;
    nationalCode: FormControl<string>;
    password: FormControl<string>;
  }> = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    role: new FormControl('User', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    mobile: new FormControl('', {
      nonNullable: true,
      validators: [lengthValidator(10)],
    }),
    nationalCode: new FormControl('', {
      nonNullable: true,
      validators: [lengthValidator(10)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  matcher = new MyErrorStateMatcher();
  selectmatcher = new MyErrorStateMatcher();

  abstract onCancel(e: MouseEvent): void;
  abstract onSubmit(e: SubmitEvent): void;
  abstract btnText: string;
}
