import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
@Output() showReviews: boolean = true;

goTo() {
  this.showReviews = false;
}
}
