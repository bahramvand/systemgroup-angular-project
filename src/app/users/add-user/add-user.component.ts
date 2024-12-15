import { Component } from '@angular/core';
import FormUser from '../form-user/form-abstrak.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-add-user',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: '../form-user/form.component.html',
  styleUrl: '../form-user/form.component.scss',
})
export class AddUserComponent extends FormUser {
  constructor(private authServ: AuthenticationService, private router: Router) {
    super();
  }

  override btnText: string = 'Create';

  override onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    if (this.editFormControl.valid) {
      const data = {
        ...this.editFormControl.value,
        role: this.editFormControl.value.role === 'Admin' ? 1 : 0,
      };

      this.authServ.createUser(data).subscribe({
        next: (state) => this.router.navigate(['users/list']),
        error: (error) => console.error(error),
      });
    }
  }

  override onCancel(e: MouseEvent): void {
    e.preventDefault();
    this.router.navigate(['users/list']);
  }
}
