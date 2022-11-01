import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from 'src/app/models/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() item!: IProduct;
  @Output() addClick = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onClick() {
    this.addClick.emit();
  }
}
