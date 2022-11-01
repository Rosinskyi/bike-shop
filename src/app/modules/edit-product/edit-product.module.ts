import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProductComponent } from 'src/app/components/edit-product/edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { EditProductRoutingModule } from './edit-product-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [EditProductComponent],
  imports: [
    CommonModule,
    EditProductRoutingModule,
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
export class EditProductModule {}
