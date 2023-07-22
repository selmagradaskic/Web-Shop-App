import { Component, OnInit } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { Review } from './Review';
import { Product } from '../home-page/Product';
import { HomePageReviewsService } from '../home-page-reviews.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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
  review: Review;
  author: string;
  registerForm: FormGroup;
  submitted = false;
  loginForm: FormGroup;
  showForm = true;



  constructor(
    private reviewsService: ReviewsService,
    private homePageReviewsService: HomePageReviewsService,
    private fb: FormBuilder
  ) {
   this.subscription = this.homePageReviewsService.getData().subscribe((res) => {
      console.log(res);
      this.receivedData = res;
      return this.receivedData;
    });
     
  }
  ngOnInit() {
    this.getReviews();
    this.buildForm();
  }


  getReviews() {
     this.reviewsService.getReviews()
      .subscribe((res) => {
      this.reviews = res;
      return this.reviews;
      });
  }

  saveReview() {
    this.review = this.loginForm.value;
      this.reviewsService.postReview(this.review).subscribe((res) => {
        console.log(res);
        this.reviews.push(res);
      });
      this.showForm = false;
      return this.review;
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      author: ["", Validators.required],
      review: ["", Validators.required]
    });
  }

  deleteReview(id: number) {
    this.reviewsService.deleteReview(id).subscribe();
    for(let review of this.reviews) {
      if(review.id == id) {
        this.reviews.splice(id);
      }
    }
    this.showForm = true;
  }

  editReview(id: number, review: Review) {
    this.reviewsService.putReview(id, review).subscribe();
    this.showForm = true;
  }

  
}
