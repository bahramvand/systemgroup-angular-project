import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import FormProduct from '../form-product/form-product.component';

@Component({
  selector: 'app-add-product',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatOptionModule,
  ],
  templateUrl: '../form-product/form-product.component.html',
  styleUrl: '../form-product/form-product.component.scss',
})
export class AddProductComponent extends FormProduct {
  constructor(private auth: AuthenticationService, private router: Router) {
    super();
  }

  override btnText: string = 'Create';

  override onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    if (this.editFormControl.valid) {
      const data = {
        ...this.editFormControl.value,
      };

      this.auth.createProduct(data).subscribe({
        next: (state) => this.router.navigate(['products/list']),
        error: (error) => console.error(error),
      });
    }
  }

  override onCancel(e: MouseEvent): void {
    e.preventDefault();
    this.router.navigate(['products/list']);
  }
}
