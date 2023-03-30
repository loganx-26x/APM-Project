import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { SharedService } from './shared.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = "Product Detail";
  product: any;
  sub: any;
  errorMessage: string = '';
  id!: number;

  constructor(private route: ActivatedRoute, 
              private router: Router, 
              private productService: ProductService,) {

   }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
    this.dataFetch();
    this.pageTitle += `: ${this.id}`;

};

  dataFetch(){
    this.sub = this.productService.getProducts().subscribe({
      next: product => {
           this.product=product;
           this.product = this.product.filter((product: IProduct) => product.productId === this.id);
           this.product = this.product[0]
           if (this.product == undefined){
            alert("No such product exists")
            this.router.navigate(['/products']);
           }
       },
       error: err => this.errorMessage = err
   }
   );
  }

  onBack(): void{
    this.router.navigate(['/products']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
}
}
