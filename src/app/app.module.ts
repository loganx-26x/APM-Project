import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { RouterModule } from '@angular/router';
import { ProductModule } from './products/product.module';
import { SharedModule } from './shared/shared.module';
import { ProductCartComponent } from './products/product-cart/product-cart.component';

@NgModule({
  declarations: [
      AppComponent,
      WelcomeComponent,
    ],
  imports: [BrowserModule,
            HttpClientModule,
            RouterModule.forRoot([
              { path: 'welcome', component: WelcomeComponent },
              { path: '', redirectTo: "welcome", pathMatch: 'full'},
              {path:"productscart", component: ProductCartComponent },
              {path: '**', redirectTo: 'products', pathMatch: 'full'}
            ]),
            ProductModule,
            SharedModule,
          ],
  bootstrap: [AppComponent]
})

export class AppModule { }
