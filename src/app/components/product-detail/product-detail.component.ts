import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { IUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private id = this.route.snapshot.paramMap.get('id')!;
  product!: IProduct;
  
  length: number = 35;
  private subscriptions: Subscription[] = [];
  deleteItemFlag: boolean = false;
  user: IUser | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getProduct();
    this.getUser();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  getProduct() {
    const subscription = this.productsService
      .getProductById(this.id)
      .subscribe((item) => (this.product = item.data() as IProduct));
    this.subscriptions.push(subscription);
  }
  deleteProduct() {
    this.productsService.deleteProduct(this.id);
    this.router.navigate(['']);
  }
  onClick() {
    console.log('smth');
  }
  
  getUser() {
    const subscription = this.auth.user$.subscribe(
      (user) => (this.user = user)
    );
    this.subscriptions.push(subscription);
  }
}
