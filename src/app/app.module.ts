import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { appService } from './appService';
import { BestSellersComponent } from './best-sellers/best-sellers.component';

@NgModule({
  declarations: [
    AppComponent,
    BestSellersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [appService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
