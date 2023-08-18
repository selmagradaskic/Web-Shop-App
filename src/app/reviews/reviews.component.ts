import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  hiddenOnce = true;



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
  stars: number[] = [];
  @Input() products: Product[]
  hidden: boolean = true;
  specificReviews: Review[] = [];
  @Input() product: Product;


  constructor(
    private reviewsService: ReviewsService,
    private homePageReviewsService: HomePageReviewsService,
    private fb: FormBuilder
  ) {
  }
  
  ngOnInit() {
    this.getReviews();
    this.buildForm();
    
  }

  getReviews() {
    this.reviewsService.getReviews()
      .subscribe((res) => {
       this.reviews = res;
        for (let review of res) {
          this.stars.push(review.stars);
        }    
      });
      this.homePageReviewsService.getData().subscribe((res) => {
        this.hiddenOnce = false;
        this.specificReviews = [];
        this.receivedData = res;
        for(let rev of this.reviews) {
          if(this.receivedData.id == rev.product) {
            this.specificReviews.push(rev);
              this.hidden = false;
          }
        }
      });
      return this.specificReviews;
  }

  saveReview() {
    this.review = this.loginForm.value;
    this.loginForm.value.product = this.receivedData.id;
    this.reviewsService.postReview(this.review).subscribe();
    this.specificReviews.push(this.review);
    this.getReviews();
    this.showForm = false;
   // return this.specificReviews;
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      id: [""],
      author: ["", Validators.required],
      review: ["", Validators.required],
      stars: ["", Validators.required],
      product: ["", Validators.required]
    });
  }

  deleteReview(id: number) {
    this.reviewsService.deleteReview(id).subscribe();
      let index = this.specificReviews.findIndex(x => x.id ===id);
      this.specificReviews.splice(index);
    this.showForm = true;
   // this.getReviews();
  }

  showMyForm() {
    this.showForm = true;
    this.showSubmit = false;
    this.showUpdate = true;
  }

  editReview() {
    let ids = [];
    for(let rev of this.reviews) {
      ids.push(rev.id);
    }
    this.loginForm.value.product = this.receivedData.id;  
    this.loginForm.value.id = Math.max(...ids) + 1;
    this.review = this.loginForm.value;
    this.reviewsService.putReview(this.review.id, this.review).subscribe();
    let index = this.specificReviews.findIndex(x => x.id ===this.review.id);
      this.specificReviews.splice(index);
      this.specificReviews.push(this.review);
    this.getReviews();
    this.showForm = false;
    
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
