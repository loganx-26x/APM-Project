import { ChangeDetectorRef, Component, OnChanges, SimpleChanges } from '@angular/core';
import { CartService } from '../cart.service';
import { IProduct } from '../product';


@Component({
  selector: 'pm-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnChanges {
  products: Map<IProduct, number> = new Map<IProduct, number>();
  handler:any = null;

  constructor(private cartService: CartService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
    this.loadStripe();

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

  getTotalValue(){
    return Math.round(this.cartService.getTotalValue());
  }

  ngOnChanges(): void {
    this.cdr.detectChanges(); // Trigger a change detection cycle
  }

  //For Stripe
  pay(amount: any) {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MrfDQSJrhsNV9f4Wmodvn8dcJ651PNCB6ZzFJJtvmztTPdKD7PbIHlo83y1aLhodkTIbIHqbRJoTFTHLW1DdIqy00GCFbYNBF',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        alert('Token Created!!');
      }
    });
 
    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100
    });
 
  }
 
  loadStripe() {
    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MrfDQSJrhsNV9f4Wmodvn8dcJ651PNCB6ZzFJJtvmztTPdKD7PbIHlo83y1aLhodkTIbIHqbRJoTFTHLW1DdIqy00GCFbYNBF',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            alert('Payment Success!!');
          }
        });
      }
       
      window.document.body.appendChild(s);
    }
  }
}
