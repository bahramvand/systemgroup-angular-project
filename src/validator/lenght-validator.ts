import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function lengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (value.length === length) {
      return null;
    }
    return { message: `You shuld have ${length}digita` };
  };
}
