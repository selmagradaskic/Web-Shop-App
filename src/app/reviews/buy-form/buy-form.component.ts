import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuyFormService } from './buy-form.service';
import { CustomerOrder } from './CustomerOrder';
import { Product } from 'src/app/home-page/Product';

@Component({
  selector: 'app-buy-form',
  templateUrl: './buy-form.component.html',
  styleUrls: ['./buy-form.component.scss']
})
export class BuyFormComponent implements OnInit{

  @Input() receivedData: Product = {
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
    thumbnail: '',
    images: []
  };
  customerOrder: CustomerOrder;
  loginForm: FormGroup;
  showBuyForm = true;
  submittedMessage = false;

  constructor(private buyFormService: BuyFormService,
    private fb: FormBuilder) {
  }

  ngOnInit(){
    this.buildForm();
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      product: ["", Validators.required],
      customerName: ["", Validators.required],
      email: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      countryState: ["", Validators.required],
      zip: ["", Validators.required],
      card: ["", Validators.required],
      exMonth: ["", Validators.required],
      exYear: ["", Validators.required],
      cvv: ["", Validators.required]
    });
  }

  saveOrder() {
    this.customerOrder = this.loginForm.value;
    this.loginForm.value.product = this.receivedData.id;
    console.log(this.loginForm.value);
    this.buyFormService.postOrder(this.customerOrder).subscribe();
    this.showBuyForm = false;
    this.submittedMessage = true;
  }

}
