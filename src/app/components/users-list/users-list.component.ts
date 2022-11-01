import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: IUser[] | undefined;
  constructor(private user: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.user
      .getUsers()
      .pipe(map((item) => item.filter((user) => user.role != 'owner')))
      .subscribe((users) => (this.users = users));
  }
}
