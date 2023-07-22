import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomePageService } from './home-page/home-page-service';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ReviewsService } from './reviews/reviews.service';
import { HomePageReviewsService } from './home-page-reviews.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BestSellersComponent,
    ReviewsComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HomePageService, ReviewsService, HomePageReviewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
