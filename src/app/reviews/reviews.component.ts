import { Component, Input, OnInit, Output } from '@angular/core';
import { ReviewsService } from './reviews.service';
import { Review } from './Review';
import { Product } from '../home-page/Product';
import { HomePageReviewsService } from '../home-page-reviews.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

@Output()
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

  @Input() closeBuy = true;
  
  hiddenOnce = true;
  showBuyForm = false;


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
  lastReview = false;

  


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
    this.showForm = false;
    return this.getReviews();
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

  getMaxId() {
    let ids = [];
    for(let rev of this.reviews) {
      ids.push(rev.id);
    }
    let index = Math.max(...ids);
    return index;
  }

  deleteReview() {
    let index = this.getMaxId();
    this.specificReviews.pop();
    this.reviewsService.deleteReview(index).subscribe();
    this.loginForm.value.author = '';
    this.loginForm.value.review = '';
    this.buildForm();
    this.showForm = true;
    this.getReviews();
  }

  showMyForm() {
    this.showForm = true;
    this.showSubmit = false;
    this.showUpdate = true;
  }

  editReview() {
    this.loginForm.value.product = this.receivedData.id;  
    this.loginForm.value.id = this.getMaxId() + 1;
    this.review = this.loginForm.value;
    this.reviewsService.putReview(this.review.id, this.review).subscribe();
    let index = this.specificReviews.findIndex(x => x.id === this.review.id);
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
  
  buy() {
    this.showBuyForm = true;
    this.hiddenOnce = true;
  }
  
  closeBuyForm() {
    this.hiddenOnce = false;
    this.showBuyForm = false;
  }

}
