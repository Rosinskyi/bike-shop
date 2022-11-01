import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  user: IUser | undefined;
  private subscriptions: Subscription[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.getUser();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  getUser() {
    const subscription = this.auth.user$.subscribe(
      (user) => (this.user = user)
    );
    this.subscriptions.push(subscription);
  }
}
