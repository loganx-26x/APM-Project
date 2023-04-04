import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './product';
import { ProductFilters } from './product-filter';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

    transform(filteredProducts: IProduct[], filters: ProductFilters): IProduct[] {
        console.log("pipe" +filteredProducts);
        if (!filteredProducts) return [];
        if (!filters || (!filters.nameFilter && !filters.codeFilter && !filters.priceFilter && !filters.starFilter)) return filteredProducts;
        

        return filteredProducts.filter((product: IProduct) => {
          return (product.productName.toLowerCase().includes((filters.nameFilter || '').toLowerCase()))
            && (product.productCode.toLowerCase().includes((filters.codeFilter || '').toLowerCase()))
            //&& (product.price >= (filters.priceFilter || Number.MAX_VALUE))
            //&& (product.starRating >= (filters.starFilter || product.starRating));
        });

      }
    
  }

