import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { IProduct } from '../product';

@Component({
  selector: 'pm-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {
  products!: IProduct[];
  
  constructor(private cartService: CartService,) { }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
  }

  onDeleteProduct(product: IProduct): void {
    this.cartService.removeProduct(product);
    this.products = this.cartService.getProducts();
  }
}
