import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import FormUser from '../form-user/form-abstrak.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import queryUserType from '../../costume-type/user-list-type';
import userRole from '../../costume-type/user-role';

@Component({
  selector: 'app-edit-user',
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
export class EditUserComponent extends FormUser implements OnInit {
  constructor(
    private activated: ActivatedRoute,
    private authServ: AuthenticationService,
    private router: Router
  ) {
    super();
  }

  user: queryUserType = {
    id: 0,
    username: '',
    role: userRole.User,
    firstName: '',
    lastName: '',
    mobile: '',
    nationalCode: '',
    password: '',
  };

  ngOnInit(): void {
    this.activated.queryParamMap.subscribe({
      next: (state) => {
        if (state.has('user')) {
          this.user = JSON.parse(state.get('user')!);
          const { id, ...userData } = this.user;
          this.editFormControl.setValue({
            ...userData,
            role: userData.role === userRole.Admin ? 'Admin' : 'User',
          });
        }
      },
    });
  }

  override btnText: string = 'Edit';

  override onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    if (this.editFormControl.valid) {
      const data = {
        ...this.editFormControl.value,
        role: this.editFormControl.value.role === 'Admin' ? 1 : 0,
        id: this.user.id,
      };

      this.authServ.editUser(data).subscribe({
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
