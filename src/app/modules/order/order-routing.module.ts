import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankfulPageComponent } from 'src/app/components/thankful-page/thankful-page.component';
import { OrderComponent } from '../../components/order/order.component';

const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: 'accepted', component: ThankfulPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
