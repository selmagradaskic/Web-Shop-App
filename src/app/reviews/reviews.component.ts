import { Component, OnInit } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { Review } from './Review';
import { Product } from '../home-page/Product';
import { HomePageReviewsService } from '../home-page-reviews.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  

  receivedData = new class implements Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    
  };

  subscription: Subscription;
  
  reviews: Review[] = [];
  

  constructor(
    private reviewsService: ReviewsService,
    private homePageReviewsService: HomePageReviewsService
  ) {
   this.subscription = this.homePageReviewsService.getData().subscribe((res) => {
      console.log(res);
      return this.receivedData = res;
    });
     
  }
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

  

}
