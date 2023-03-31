import {  Injectable } from '@angular/core';
import { IProduct } from './product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Map<IProduct, number> = new Map<IProduct, number>();

  constructor( ) {
    
   }

  addToCart(product: IProduct) {
    if (this.items.has(product)) {
      this.items.set(product, (this.items.get(product) ?? 0) + 1);
    } else {
      this.items.set(product, 1);
    }
  }

  getProducts() {
    return this.items;
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
}