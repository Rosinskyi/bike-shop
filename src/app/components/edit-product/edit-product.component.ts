import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/models/product';
import { ImageStoreService } from 'src/app/services/image-store.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
  providers: [MessageService],
})
export class EditProductComponent implements OnInit, OnDestroy {
  product!: IProduct;
  productEditForm!: FormGroup;
  private id = this.route.snapshot.paramMap.get('id')!;
  private subscriptions: Subscription[] = [];
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private imageStoreService: ImageStoreService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  initForm() {
    this.productEditForm = this.fb.group({
      imgUrl: this.fb.array(this.product.imgUrl, Validators.required),
      price: [this.product.price, Validators.required],
      discount: [this.product.discount],
      main: [this.product.main],
      shop: [this.product.shop],
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      shipping: [this.product.shipping],
      discountUntil: [this.product.discountUntil],
      new: [this.product.new],
      color: this.fb.array(this.product.color, Validators.required),
      size: this.fb.array(this.product.size, Validators.required),
      review: this.fb.array(this.product.review),
    });
  }

  getProduct() {
    const subscription = this.productsService
      .getProductById(this.id)
      .subscribe((item) => {
        this.product = item.data() as IProduct;
        this.initForm();
      });

    this.subscriptions.push(subscription);
  }
  updateProduct() {
    this.productsService.updateProduct(
      this.productEditForm.getRawValue() as IProduct,
      this.id
    );
    this.router.navigate([`products/${this.id}`]);
  }
  async onUpload(event: any) {
    for (let file of event.target.files) {
      await this.imageStoreService.getFileUrl(file).then((url: string) => {
        this.imgUrl.push(new FormControl(url));
      });
    }
  }
  get imgUrl() {
    return this.productEditForm.get('imgUrl') as FormArray;
  }
  get price() {
    return this.productEditForm.get('price')!;
  }
  get name() {
    return this.productEditForm.get('name')!;
  }
  get shop() {
    return this.productEditForm.get('shop')!;
  }
  get description() {
    return this.productEditForm.get('description')!;
  }
  get color() {
    return this.productEditForm.get('color') as FormArray;
  }
  get size() {
    return this.productEditForm.get('size') as FormArray;
  }
  get discount() {
    return this.productEditForm.get('discount')!;
  }
  addColor(value: string) {
    this.color.push(new FormControl(value));
  }
  addSize(value: string) {
    this.size.push(new FormControl(value));
  }
  removeColor(item: string) {
    this.color.removeAt(this.color.value.indexOf(item));
  }
  removeSize(item: string) {
    this.size.removeAt(this.size.value.indexOf(item));
  }
  deleteImg(item: string) {
    this.imgUrl.removeAt(this.imgUrl.value.indexOf(item));
  }
}
