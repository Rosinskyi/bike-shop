import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from 'src/app/components/edit-product/edit-product.component';

const routes: Routes = [{ path: '', component: EditProductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProductRoutingModule {}
