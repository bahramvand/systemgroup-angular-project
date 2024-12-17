import { Component, OnInit } from '@angular/core';
import userType from '../../costume-type/user-list-type';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../authentication.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../../shared-components/logout-confirmation-dialog/logout-confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    CommonModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  list: userType[] = [];

  isAdmin: boolean = false;

  constructor(
    private dialog: MatDialog,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getUsers().subscribe({
      next: (data: any) => {
        this.list = Object.values(data);
      },
    });

    this.auth.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
  }

  onEdit(user: userType): void {
    this.router.navigate(['users/edit-user'], {
      queryParams: { user: JSON.stringify(user) },
    });
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(LogoutConfirmationDialogComponent, {
      height: '150px',
      width: '500px',
      data: {
        questionTxt: `Are you sure you want Delete user#${id}?`,
        confirmTxt: 'Delete',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.auth.deleteUser(id).subscribe({
          next: (data) => (this.list = Object.values(data)),
          error: (err) => console.error(err),
        });
      }
    });
  }
}
