import { Component, Input, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() user!: IUser;
  roles: string[] = ['customer', 'admin'];
  newRole: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {}
  onChangeRole(role: string) {
    this.newRole = role;
  }
  updateRole() {
    this.userService.updateUserRole(this.user, this.newRole);
  }
}
