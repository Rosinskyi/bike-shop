import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ImageStoreService } from 'src/app/services/image-store.service';
import { ProductsService } from 'src/app/services/products/products.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [MessageService],
})
export class AddProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup = this.fb.group({
    imgUrl: this.fb.array([], Validators.required),
    price: ['', [Validators.required, Validators.min(1)]],
    discount: [0],
    main: [false],
    shop: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(10)]],
    shipping: [''],
    discountUntil: [''],
    new: false,
    color: this.fb.array([], Validators.required),
    size: this.fb.array([], Validators.required),
    review: this.fb.array([]),
  });
  tempColor: string = '';
  private subscriptions: Subscription[] = [];
  url!: string;
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private productsService: ProductsService,
    private imageStoreService: ImageStoreService
  ) {}

  async onUpload(event: any) {
    for (let file of event.files) {
      await this.imageStoreService.getFileUrl(file).then((url: string) => {
        this.imgUrl.push(new FormControl(url));
      });
      this.imgUrl.markAsDirty();
    }
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  onSubmit() {
    this.productsService.addProduct(this.productForm.getRawValue());
    this.router.navigate(['']);
  }

  get imgUrl() {
    return this.productForm.get('imgUrl') as FormArray;
  }
  get price() {
    return this.productForm.get('price')!;
  }
  get name() {
    return this.productForm.get('name')!;
  }
  get shop() {
    return this.productForm.get('shop')!;
  }
  get description() {
    return this.productForm.get('description')!;
  }
  get color() {
    return this.productForm.get('color') as FormArray;
  }
  get size() {
    return this.productForm.get('size') as FormArray;
  }
  get discount() {
    return this.productForm.get('discount')!;
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
}
