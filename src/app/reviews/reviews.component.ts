import { Component, Input, OnInit } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { Review } from './Review';
import { Product } from '../home-page/Product';
import { HomePageComponent } from '../home-page/home-page.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  
  @Input() selectedProduct: Product = {
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
  
  reviews: Review[] = [];
  

 

  constructor(
    private reviewsService: ReviewsService,
    private homePageComponent: HomePageComponent
  ) {}

  

  ngOnInit() {
    this.getReviews();
  }


  getReviews() {
     this.reviewsService.getReviews()
      .subscribe((res) => {
      this.reviews = res;
      return this.reviews;
      });
  }

  getSelectedProduct() {
    this.selectedProduct = this.homePageComponent.selectedProduct;
    return this.selectedProduct;
  }

}
