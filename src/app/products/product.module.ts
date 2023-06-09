import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { DialogElementsExampleDialog, ProductCartComponent } from './product-cart/product-cart.component';
import { ProductFilterPipe } from './product-filter.pipe';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductCartComponent,
    DialogElementsExampleDialog,
    ProductFilterPipe,

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSliderModule,
    MatSelectModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      {
        path: 'products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent,
      },
    ]),
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductModule {}
