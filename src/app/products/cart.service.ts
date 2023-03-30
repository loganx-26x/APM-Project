import { Injectable } from '@angular/core';
import { IProduct } from './product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: IProduct[] = [];

  constructor() { }

  addToCart(product: IProduct) {
    this.items.push(product);
  }

  getProducts() {
    return this.items;
  }


  removeProduct(product: IProduct): void {
    const index = this.items.indexOf(product);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }
  
  //Not used till now
  clearCart() {
    this.items = [];
    return this.items;
  }
}