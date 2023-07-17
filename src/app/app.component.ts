import { Component, Input, OnInit } from '@angular/core';
import { homePageService } from './home-page/home-page-service';
import { Product } from './home-page/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
