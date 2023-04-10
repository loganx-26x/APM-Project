import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { ProductFilters } from './product-filter';
import { ProductFilterPipe } from './product-filter.pipe';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;
  cartImage: string = 'assets/images/cart-icon.png';
  filters: ProductFilters = new ProductFilters();
  productFilterPipe: any = new ProductFilterPipe();

  //for sliders
  disabled = false;
  max!: number;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  values = [this.min, this.max];

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter', value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private sharedService: SharedService,
    private cartService: CartService,
    private router: Router
  ) {}

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  toggleImages(image: IProduct) {
    image.showImages = !image.showImages;
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
    setTimeout(() => {
      this.maxFinder();
    }, 1000);

    setTimeout(() => {
      this.filters.priceFilterMin = String(this.values[0]);
      this.filters.priceFilterMax = String(this.values[1]);
    }, 3000);

    console.log('Here' + this.values[1]);
  }

  maxFinder() {
    this.max = this.products[0].price; // Initialize this.max to the first product's price

    for (let i = 1; i < this.products.length; i++) {
      this.max = Math.max(this.products[i].price, this.max);
      console.log(this.max);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List:' + message;
  }

  openDialog(product: any) {
    this.sharedService.setProduct(product);
  }

  addToCart(product: IProduct) {
    console.log(this.cartService.items);
    this.cartService.addToCart(product);
    //window.alert('Product added to cart!');
  }

  onCartClick(): void {
    this.router.navigate(['productscart']);
  }

  /*Sort Columns*/
  onFilterInputChange() {
    this.filters.nameFilter = this.filters.nameFilter
      ? this.filters.nameFilter.toLowerCase()
      : '';
    this.filters.codeFilter = this.filters.codeFilter
      ? this.filters.codeFilter.toLowerCase()
      : '';

    this.filters.priceFilterMin = this.filters.priceFilterMin
      ? this.filters.priceFilterMin
      : '';
    this.filters.priceFilterMax = this.filters.priceFilterMax
      ? this.filters.priceFilterMax
      : '';
    this.filters.starFilter = this.filters.starFilter
      ? this.filters.starFilter
      : '';
    this.filteredProducts = this.productFilterPipe.transform(
      this.products,
      this.filters
    );
  }
}
