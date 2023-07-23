import { Component, OnInit } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { Review } from './Review';
import { Product } from '../home-page/Product';
import { HomePageReviewsService } from '../home-page-reviews.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscribable, Subscription } from 'rxjs';
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

  
  reviews: Review[] = [];
  review: Review;
  author: string;
  submitted = false;
  loginForm: FormGroup;
  showForm = true;
  showUpdate = false;
  showSubmit = true;
  reviewStars: number[] = [1, 2, 3, 4, 5];
  selectedValue: number;
  subscription: Subscription;
  stars: number[] = [];


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
      for(let review of res) {
        this.stars.push(review.stars);
      }
      return this.reviews;
      });
  }

  saveReview() {
    this.review = this.loginForm.value;
    /* for(let rev of this.reviews) {
      if(this.reviews.length > 0 && rev.author == this.review.author) {
         return this.editReview(this.review.id, this.review);
      } 
     else { */
        this.reviewsService.postReview(this.review).subscribe((res) => {
          this.reviews.push(res);
        });
        this.showForm = false;
        return this.review;
    /*  }
    } */
    
   // return this.review;
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      author: ["", Validators.required],
      review: ["", Validators.required],
      stars: ["", Validators.required]
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

  showMyForm() {
   this.showForm = true;
   this.showSubmit = false;
   this.showUpdate = true;

  }

  editReview(review: Review) {
      this.showForm = false;
      this.reviewsService.putReview(review.id, review);
  }

  getReview(id: number) {
    return this.reviewsService.getReview(id).subscribe();
  }

  
countStar(star: number) {
  this.selectedValue = star;
  this.loginForm.value.stars = this.selectedValue;
}

addClass(star: number) {
 let ab = "";
 for (let i = 0; i < star; i++) {
   ab = "starId" + i;
   document.getElementById(ab).classList.add("selected");
 }
}
removeClass(star: number) {
 let ab = "";
 for (let i = star-1; i >= this.selectedValue; i--) {
   ab = "starId" + i;
   document.getElementById(ab).classList.remove("selected");
 }
}
  
}
