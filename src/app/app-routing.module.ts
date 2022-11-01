import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { ReviewsComponent } from './components/reviews/reviews.component';

import { UsersListComponent } from './components/users-list/users-list.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  { path: 'contacts', component: ContactsComponent },
  {
    path: 'order',
    loadChildren: () =>
      import('./modules/order/order.module').then((m) => m.OrderModule),
    data: { role: ['owner', 'customer', 'admin'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'add-product',
    loadChildren: () =>
      import('./modules/add-product/add-product.module').then(
        (m) => m.AddProductModule
      ),
    data: { role: ['admin'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersListComponent,
    data: { role: ['owner'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
  { path: 'products/:id/reviews', component: ReviewsComponent },
  {
    path: 'products/:id/edit',
    loadChildren: () =>
      import('./modules/edit-product/edit-product.module').then(
        (m) => m.EditProductModule
      ),
    data: {
      role: ['admin', 'owner'],
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
