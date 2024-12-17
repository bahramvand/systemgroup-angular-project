import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ProductType from '../../costume-type/product-type';
import { AuthenticationService } from '../../authentication.service';
import FormProduct from '../form-product/form-product.component';

@Component({
  selector: 'app-edit-product',
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
export class EditProductComponent extends FormProduct implements OnInit {
  constructor(
    private activated: ActivatedRoute,
    private auth: AuthenticationService,
    private router: Router
  ) {
    super();
  }

  product: ProductType = {
    id: 0,
    name: '',
    code: '',
    weight: 0,
  };

  ngOnInit(): void {
    this.activated.queryParamMap.subscribe({
      next: (state) => {
        if (state.has('product')) {
          this.product = JSON.parse(state.get('product')!);
          const { id, ...productData } = this.product;
          this.editFormControl.setValue({
            ...productData,
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
        id: this.product.id,
      };
      console.log(data);
      
      this.auth.editProduct(data).subscribe({
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
