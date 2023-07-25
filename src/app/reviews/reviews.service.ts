import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Review } from "./Review";

@Injectable(
    {providedIn: 'root'}
  )
export class ReviewsService {
    
    constructor(
    private http: HttpClient
    ) {}
    private url = "http://localhost:8080/reviews";


    public getReviews(): Observable<Review[]> {
        return this.http.get<Review[]>(this.url, {observe: 'body'});
        }

    public postReview(review: Review): Observable<Review> {
      return this.http.post<Review>(this.url, review);
    }

    public deleteReview(id: number): Observable<Review> {
      return this.http.delete<Review>(`http://localhost:8080/reviews/${id}`);
    }

    public getReview(id: number): Observable<Review> {
      return this.http.get<Review>(`http://localhost:8080/reviews/${id}`);
    }

    public putReview(id: number, review: Review) {
      return this.http.put<Review>(`http://localhost:8080/reviews/${id}`, review);
    }

  }

    


