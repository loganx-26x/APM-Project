import { ChangeDetectorRef, Component, OnChanges } from '@angular/core';
import { CartService } from '../cart.service';
import { IProduct } from '../product';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'pm-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css'],
})
export class ProductCartComponent implements OnChanges {
  products!: {key: IProduct, value: number | undefined}[];
  handler: any = null;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private changeDetector: ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.refreshData();
    this.changeDetector.detectChanges();
    //this.loadStripe();
  }

  refreshData(){
    this.cartService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  onDeleteProduct(product: IProduct): void {
    const itemQuantity = this.cartService.items.get(product);
    if (itemQuantity !== undefined && itemQuantity === 1) {
      this.cartService.items.delete(product);
    } else if (itemQuantity !== undefined && itemQuantity > 1) {
      this.cartService.items.set(product, itemQuantity - 1);
    }
    this.refreshData();
  }

  onDeleteCompleteProduct(product: any) {
    this.cartService.items.delete(product);
    this.refreshData();
  }

  getTotalValue() {
    return Math.round(this.cartService.getTotalValue());
  }

  allProductInfo() {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '1300px', // Set the width of the dialog
      height: '700px', // Set the height of the dialog
    });
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
        console.log(token);
        alert('Token Created!!');
      },
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
      amount: amount * 100,
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MrfDQSJrhsNV9f4Wmodvn8dcJ651PNCB6ZzFJJtvmztTPdKD7PbIHlo83y1aLhodkTIbIHqbRJoTFTHLW1DdIqy00GCFbYNBF',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogElementsExampleDialog {
  products!: {key: IProduct, value: number | undefined}[];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(products => {
      this.products = products;
    });
    console.log(this.products);
  }
}
