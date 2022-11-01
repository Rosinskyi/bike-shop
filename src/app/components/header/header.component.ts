import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isOpen: boolean = false;
  user: IUser | undefined;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.auth.user$.subscribe((user) => (this.user = user));
  }
  signOut() {
    this.auth.signOut();
  }
  openWindow() {
    this.isOpen = !this.isOpen;
  }
}
