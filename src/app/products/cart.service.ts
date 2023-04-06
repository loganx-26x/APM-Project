import {  Injectable } from '@angular/core';
import { IProduct } from './product';
import { ProductCartComponent } from './product-cart/product-cart.component';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Map<IProduct, number> = new Map<IProduct, number>();
  productCart = ProductCartComponent
  constructor( ) {
    
   }

  addToCart(product: IProduct) {
    if (this.items.has(product)) {
      this.items.set(product, (this.items.get(product) ?? 0) + 1);
    } else {
      this.items.set(product, 1);
    }
  }

  getProducts(): Observable<{key: IProduct, value: number | undefined}[]> {
    const productsArray = Array.from(this.items.keys()).map(keyVal => {
      return { key: keyVal, value: this.items.get(keyVal) };
    });
    return of(productsArray);
  }

  removeProduct(product: IProduct): void {
    let itemQuantity = this.items.get(product);
    
    if (itemQuantity !== undefined && itemQuantity > 1) 
    {
      this.items.set(product, itemQuantity - 1);
    }
    else 
    {
      this.items.delete(product);
    }
  }
  
  //Not used till now
  clearCart() {
    this.items = new Map<IProduct, number>();
    return this.items;
  }


  // All items and their total value
  getTotalValue(): number {
    let total = 0;
    for (const [product, quantity] of this.items.entries()) {
      total += product.price * quantity;
    }
    return total;
  }
}