import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from 'src/app/components/order/order.component';

@NgModule({
  declarations: [OrderComponent],
  imports: [CommonModule, OrderRoutingModule, ReactiveFormsModule],
})
export class OrderModule {}
