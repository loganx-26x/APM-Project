import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  
  product: any;
  private apiUrl = 'api/products/products';



  setProduct(product: any) {
    this.product = product;
  }

  

}
