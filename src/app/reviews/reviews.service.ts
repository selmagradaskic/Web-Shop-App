import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable(
    {providedIn: 'root'}
  )
export class ReviewsService {
    
    constructor(
    private http: HttpClient
    ) {}
    private url = "http://localhost:8080/reviews";


    public getReviews(): Observable<any> {
        return this.http.get<any>(this.url, {observe: 'body'});
        }
    }

    


