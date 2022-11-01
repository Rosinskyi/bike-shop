import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
  orderForm: FormGroup = this.fb.group({
    goods: this.fb.group({
      good: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    }),
    address: this.fb.group({
      country: ['', [Validators.required, Validators.minLength(4)]],
      city: ['', [Validators.required, Validators.minLength(4)]],
      address: ['', [Validators.required, Validators.minLength(4)]],
    }),
    payment: ['', [Validators.required]],
    delivery: ['', [Validators.required]],
  });
  products!: IProduct[];
  private subscriptions: Subscription[] = [];
  formStep: string = 'good';
  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  getProducts() {
    const subscription = this.productsService
      .getProducts()
      .subscribe((products) => (this.products = products));
    this.subscriptions.push(subscription);
  }
  nextStep() {
    switch (this.formStep) {
      case 'good':
        this.good.markAsDirty();
        this.description.markAsDirty();
        this.goods.valid ? (this.formStep = 'delivery') : '';
        break;
      case 'delivery':
        this.country.markAsDirty();
        this.city.markAsDirty();
        this.address.markAsDirty();
        this.addressGroup.valid ? (this.formStep = 'payment') : '';
        break;
      case 'payment':
        this.payment.markAsDirty();
        this.payment.valid ? (this.formStep = 'date') : '';
        break;
      case 'date':
        this.delivery.markAsDirty();
        this.delivery.valid ? (this.formStep = 'summary') : '';
        break;
    }
  }
  prevStep() {
    switch (this.formStep) {
      case 'delivery':
        this.formStep = 'good';
        break;
      case 'payment':
        this.formStep = 'delivery';
        break;
      case 'date':
        this.formStep = 'payment';
        break;
      case 'summary':
        this.formStep = 'date';
        break;
    }
  }
  get goods() {
    return this.orderForm.get('goods')!;
  }
  get good() {
    return this.goods.get('good')!;
  }
  get description() {
    return this.goods.get('description')!;
  }
  get addressGroup() {
    return this.orderForm.get('address')!;
  }
  get country() {
    return this.addressGroup.get('country')!;
  }
  get city() {
    return this.addressGroup.get('city')!;
  }
  get address() {
    return this.addressGroup.get('address')!;
  }
  get payment() {
    return this.orderForm.get('payment')!;
  }
  get delivery() {
    return this.orderForm.get('delivery')!;
  }
}
