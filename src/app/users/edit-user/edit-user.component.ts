import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import userType from '../../costume-type/user-list-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  imports: [CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  user: userType | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next: (sate) => {
        if (sate.has('user')) this.user = JSON.parse(sate.get('user')!);
      },
    });
  }
}
