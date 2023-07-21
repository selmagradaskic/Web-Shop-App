import { Observable } from "rxjs"
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable(
  {providedIn: 'root'}
)
export class HomePageService {

constructor(
        private http: HttpClient
    ) {}
 productsUrl = 'https://dummyjson.com/products'

getProducts(): Observable<any> {
    return this.http.get<any>(this.productsUrl, {observe: 'body'});
  }

}