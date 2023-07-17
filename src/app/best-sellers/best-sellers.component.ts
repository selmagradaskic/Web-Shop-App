import { Component, Input } from '@angular/core';
import { Product } from '../home-page/Product';

@Component({
  selector: 'app-best-sellers',
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.scss']
})
export class BestSellersComponent {
  @Input() products: any;
  
  product: Product[] = [];

}
