import { Component, OnInit } from '@angular/core';
import userType from '../../costume-type/user-list-type';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../authentication.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

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

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.getUsers().subscribe({
      next: (data: any) => {
        this.list = Object.values(data);
      },
    });
  }

  onEdit(user: userType): void {
    this.router.navigate(['users/edit-user'], {
      queryParams: { user: JSON.stringify(user) },
    });
  }

  onDelete(user: userType): void {
    alert(`Delete User: ${user.username}`);
  }
}
