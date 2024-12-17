import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import product from '../../costume-type/product-type';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoutConfirmationDialogComponent } from '../../shared-components/logout-confirmation-dialog/logout-confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    CommonModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: product[] = [];
  isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });

    this.auth.getProducts().subscribe({
      next: (data) => {
        this.products = Object.values(data);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  onEdit(product: product): void {
    this.router.navigate(['products/edit-product'], {
      queryParams: { product: JSON.stringify(product) },
    });
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent, {
      height: '150px',
      width: '500px',
      data: {
        questionTxt: `Are you sure you want Delete product#${id}?`,
        confirmTxt: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.auth.deleteUser(id).subscribe({
          next: (data) => (this.products = Object.values(data)),
          error: (err) => console.error(err),
        });
      }
    });
  }
}
