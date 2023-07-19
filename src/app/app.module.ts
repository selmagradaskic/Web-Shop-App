import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { homePageService } from './home-page/home-page-service';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { ReviewsService } from './reviews/reviews.service';

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
    AppRoutingModule
  ],
  providers: [homePageService, HttpClient, ReviewsService, HomePageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
