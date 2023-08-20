import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  showReviews: boolean = false;

  show() {
  this.showReviews = true
  this.reloadPage();
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
}
}
