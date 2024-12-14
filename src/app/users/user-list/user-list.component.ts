import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import userType from '../../costume-type/user-list-type';
import { MatTableModule } from '@angular/material/table';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from '../../authentication.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    MatIconModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  list: userType[] = [];
  displayedColumns: string[] = ['username', 'role', 'actions'];
  dataSource = new MatTableDataSource<userType>(this.list);

  constructor(private auth: AuthenticationService, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('http://localhost:3000/api/users', {
        headers: {
          authorization: this.auth.getAuthTokenFromLocalStorage()!,
        },
      })
      .subscribe({
        next: (data: any) => {
          this.list = Object.values(data);
          this.dataSource = new MatTableDataSource(this.list);
        },
      });
  }

  onRowClick(user: userType): void {
    alert(`User clicked: ${user.username}`);
  }

  onEdit(user: userType): void {
    alert(`Edit User: ${user.username}`);
  }

  onDelete(user: userType): void {
    alert(`Delete User: ${user.username}`);
  }
}
