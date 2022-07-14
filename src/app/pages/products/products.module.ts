import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { MaterialModule } from './../../material.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProductsComponent, ProductComponent],
  imports: [CommonModule, ProductsRoutingModule, MaterialModule, MatIconModule],
})
export class ProductsModule {}
