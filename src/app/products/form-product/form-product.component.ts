import { signal } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';

import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

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

export default abstract class FormProduct {
  constructor() {}

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  editFormControl: FormGroup<{
    name: FormControl<string>;
    code: FormControl<string>;
    weight: FormControl<number>;
  }> = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    code: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    weight: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
  });

  matcher = new MyErrorStateMatcher();

  abstract onCancel(e: MouseEvent): void;
  abstract onSubmit(e: SubmitEvent): void;
  abstract btnText: string;
}