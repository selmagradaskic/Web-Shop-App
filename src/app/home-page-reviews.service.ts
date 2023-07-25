import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from './home-page/Product';

@Injectable({
  providedIn: 'root'
})
export class HomePageReviewsService {
   dataSubject = new Subject<Product>();
   data = this.dataSubject.asObservable();

  sendData(data: any) {
    return this.dataSubject.next(data);
  }

 /*  getData() {
    return this.dataSubject;
  } */
  
}
