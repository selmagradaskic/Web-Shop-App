import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { Review } from './Review';
import { Product } from '../home-page/Product';
import { HomePageReviewsService } from '../home-page-reviews.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  receivedData: Product = {
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
 /*  title = "";
  description: string;
  image: string;
  receivedDataArguments: string[] = []; */
  selectedProducts = [];

  constructor(
    private reviewsService: ReviewsService,
    private homePageReviewsService: HomePageReviewsService,
    private fb: FormBuilder
  ) {
 
  }
  
  ngOnInit() {
    this.homePageReviewsService.data.subscribe((res) => {
    return this.receive(res);
    })
  
    this.getReviews();
    this.buildForm();
  }

 
   receive(receivedData: Product) {
   /* this.receivedData = receivedData;
   console.log(this.receivedData); */
   this.selectedProducts.push(receivedData);
   console.log(this.selectedProducts, 'SELECTED');
   return this.selectedProducts;
  }


  getReviews() {
    this.reviewsService.getReviews()
      .subscribe((res) => {
        this.reviews = res;
        for (let review of res) {
          this.stars.push(review.stars);
        }
        return this.reviews;
      });
  }

  saveReview() {
    this.review = this.loginForm.value;
    this.reviewsService.postReview(this.review).subscribe((res) => {
      this.reviews.push(res);
    });
    this.showForm = false;
    return this.review;
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      author: ["", Validators.required],
      review: ["", Validators.required],
      stars: ["", Validators.required]
    });
  }

  deleteReview(id: number) {
    this.reviewsService.deleteReview(id).subscribe(() => {
      this.getReviews();
    });
    this.showForm = true;
  }

  showMyForm() {
    this.showForm = true;
    this.showSubmit = false;
    this.showUpdate = true;

  }

  editReview() {
    let id: number;
    this.review = this.loginForm.value;
    for(let rev of this.reviews) {
      if(this.review.author == rev.author) {
         id = rev.id;
          this.reviewsService.putReview(id, this.review).subscribe(() => {
          this.getReviews();
         });
      }
    }
    this.showForm = false;
    return this.review;
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
    for (let i = star - 1; i >= this.selectedValue; i--) {
      ab = "starId" + i;
      document.getElementById(ab).classList.remove("selected");
    }
  }

}
