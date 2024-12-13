import { Component } from '@angular/core';
import userType from '../../costume-type/user-list-type';
import userRole from '../../costume-type/user-role';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  list: userType[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      role: userRole.Admin,
      nationalId: '1234567890',
      mobile: '09123456789',
      username: 'john.doe',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      role: userRole.User,
      nationalId: '0987654321',
      mobile: '09119876543',
      username: 'jane.smith',
    },
    {
      id: 3,
      firstName: 'Ali',
      lastName: 'Rezaei',
      role: userRole.User,
      nationalId: '1122334455',
      mobile: '09351234567',
      username: 'ali.rezaei',
    },
    {
      id: 4,
      firstName: 'Sara',
      lastName: 'Ahmadi',
      role: userRole.Admin,
      nationalId: '5566778899',
      mobile: '09131234567',
      username: 'sara.ahmadi',
    },
    {
      id: 5,
      firstName: 'Michael',
      lastName: 'Johnson',
      role: userRole.Admin,
      nationalId: '2233445566',
      mobile: '09141234567',
      username: 'michael.j',
    },
  ];

  deleteUser(userId: number): void {
    this.list = this.list.filter((user) => user.id !== userId);
  }

  editUser(userId: number): void {
    console.log('Editing user with ID:', userId);
    // Implement edit logic here
  }
}
