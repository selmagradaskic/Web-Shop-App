import { Component, Input, OnInit } from '@angular/core';
import { appService } from './appService';
import { Product } from './Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  product: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: []
  };

  constructor(
    private appService: appService
  ) {
  }
  title = 'myApp';
  curPage!: number;
  pageSize!: number;
  columnNumber = false;

products: Product[] = [];

ngOnInit() {
this.fetchData();

}

fetchData() {
  this.appService.getProducts().subscribe((resp) => {
    this.products = resp.products;
    for(let i = 0; i < this.products.length; i++)  {
      let producstNonGrata = ['perfume', 'serum', 'key', 'lamp', 'oil', 'cream', 'masoor', 'macaroni', 'plant', 'bird'];
      const checkForProduct = producstNonGrata.some(el => this.products[i].title.toLowerCase().includes(el));
      if(checkForProduct) {
        this.products.splice(i);
      }
    }
    return this.products;
});
}


}
