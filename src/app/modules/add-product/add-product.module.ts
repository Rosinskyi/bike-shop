import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductRoutingModule } from './add-product-routing.module';
import { AddProductComponent } from 'src/app/components/add-product/add-product.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule,
    ButtonModule,
    TabViewModule,
    HttpClientModule,
    MatIconModule,
  ],
})
export class AddProductModule {}
