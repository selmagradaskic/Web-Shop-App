import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { ReviewsComponent } from './reviews/reviews.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppComponent } from './app.component';


const routes: Routes = [{ path: '', component: AppComponent },
{ path: 'reviews-component', component: ReviewsComponent }
]; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
