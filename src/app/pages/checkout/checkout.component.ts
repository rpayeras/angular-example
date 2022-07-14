import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  model = {
    name: 'Testuser',
    store: '',
    shippingAddress: '',
    city: '',
  };

  constructor() {}

  ngOnInit(): void {}

  onPickupOrDelivery(value: boolean) {
    console.log(value);
  }
}
