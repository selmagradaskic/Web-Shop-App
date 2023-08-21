import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CustomerOrder } from "./CustomerOrder";
import { Observable } from "rxjs";

@Injectable(
    { providedIn: 'root' }
)

export class BuyFormService {

    constructor(
        private http: HttpClient
    ) { }

    private url = "http://localhost:8080/orders";


    public getOrders(): Observable<CustomerOrder[]> {
        return this.http.get<CustomerOrder[]>(this.url);
    }

    public postOrder(customerOrder: CustomerOrder): Observable<CustomerOrder> {
        return this.http.post<CustomerOrder>(this.url, customerOrder);
    }

    public deleteOrder(id: number): Observable<CustomerOrder> {
        return this.http.delete<CustomerOrder>(`http://localhost:8080/orders/${id}`);
    }

    public getReview(id: number): Observable<CustomerOrder> {
        return this.http.get<CustomerOrder>(`http://localhost:8080/orders/${id}`);
    }

    public putReview(id: number, customerOrder: CustomerOrder) {
        return this.http.put<CustomerOrder>(`http://localhost:8080/orders/${id}`, customerOrder);
    }
}