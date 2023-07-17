import { Component, OnInit } from '@angular/core';
import { homePageService } from './home-page-service';
import { Router } from '@angular/router';
import { Product } from './Product';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  
    [x: string]: any;
    
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
        private homePageService: homePageService,
        private router: Router
      ) {
      }
      title = 'myApp';
    
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
    
    openNewPage(){
      this.router.navigateByUrl('reviews.html');
      }
}
