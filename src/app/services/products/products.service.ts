import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  itemDoc!: AngularFirestoreDocument<IProduct>;
  private productsCollection: AngularFirestoreCollection<IProduct> =
    this.fireStore.collection('products');
  private products: Observable<IProduct[]> = this.productsCollection
    .snapshotChanges()
    .pipe(
      map((changes) => {
        return changes.map((a: any) => {
          const data = a.payload.doc.data() as IProduct;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );

  constructor(private readonly fireStore: AngularFirestore) {}

  ngOnInit(): void {}

  getProducts(): Observable<IProduct[]> {
    return this.products;
  }

  getProductById(id: string) {
    return this.productsCollection.doc(id).get();
  }

  addProduct(product: IProduct) {
    this.productsCollection.add(product);
  }
  updateProduct(product: IProduct, id: string) {
    this.productsCollection.doc(id).update(product as IProduct);
  }
  deleteProduct(id: string) {
    this.productsCollection.doc(id).delete();
  }
}
