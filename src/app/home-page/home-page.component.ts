import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { homePageService } from './home-page-service';
import { Product } from './Product';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

    sendSelectedProduct = new EventEmitter<Product>();
    
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

      @Output()
      selectedProduct: Product = {
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
        private homePageService: homePageService
      ) {
      }
    
    
    products: Product[] = [];
    
    
    
    
    ngOnInit() {
    this.fetchData();
    }
    
    fetchData() {
      this.homePageService.getProducts().subscribe((resp) => {
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

    selectedProducts(product: Product) {
      this.selectedProduct = product;
      this.sendSelectedProduct.emit(this.selectedProduct);
      console.log(this.selectedProduct);
    }

 


}
