import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductFilterPipe } from './product-filter.pipe';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductCartComponent,
    ProductFilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
              {
                path: 'products/:id',
                canActivate: [ProductDetailGuard],
                component: ProductDetailComponent 
              },
    ]),
    SharedModule,
  ]
})
export class ProductModule { }
