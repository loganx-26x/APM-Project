import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { IProduct } from '../product';

@Component({
  selector: 'pm-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {
  products: Map<IProduct, number> = new Map<IProduct, number>();
  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
  }

  onDeleteProduct(product: IProduct): void {
    const itemQuantity = this.products.get(product);
    if (itemQuantity !== undefined && itemQuantity === 1) {
      this.products.delete(product);
    }
    else if (itemQuantity !== undefined && itemQuantity > 1) 
    {
      this.products.set(product, itemQuantity - 1);
    }
    
  }

}
