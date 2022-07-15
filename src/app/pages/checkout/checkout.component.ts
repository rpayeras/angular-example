import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { delay, switchMap, tap } from 'rxjs';

import { Store } from 'src/app/shared/interfaces/store.interface';
import { DataService } from '../../shared/services/data.service';
import { Product } from '../products/interfaces/product.interface';
import { OrderDetail } from '../../shared/interfaces/order.interface';
import { ShoppingCartService } from '../../shared/services/shopping-cart.service';
import { ProductsService } from '../products/services/products.service';
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
  isDelivery: boolean = true;
  cart: Product[] = [];
  stores: Store[] = [];

  constructor(
    private dataSvc: DataService,
    private shoppingCartSvc: ShoppingCartService,
    private router: Router,
    private productSvc: ProductsService
  ) {}

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
  }

  onPickupOrDelivery(value: boolean) {
    this.isDelivery = value;
  }

  onSubmit({ value: formData }: NgForm): void {
    console.log(formData);
    const data = {
      ...formData,
      date: this.getCurrentDay(),
      pickup: this.isDelivery,
    };

    this.dataSvc
      .saveOrder(data)
      .pipe(
        tap((res) => console.log(res)),
        switchMap((order) => {
          const details: OrderDetail[] = this.prepareDetails(order.id);

          return this.dataSvc.saveDetailsOrder(details);
        }),
        tap((res) => this.router.navigate(['/checkout/thank-you'])),
        delay(2000),
        tap(() => this.shoppingCartSvc.resetCart())
      )
      .subscribe();
  }

  private getStores(): void {
    this.dataSvc
      .getStores()
      .pipe(tap((res) => (this.stores = res)))
      .subscribe();
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

  private prepareDetails(orderId: number): OrderDetail[] {
    const details: OrderDetail[] = [];

    this.cart.forEach((product) => {
      const {
        id: productId,
        name: productName,
        qty: quantity,
        stock,
      } = product;
      const newStock = stock - quantity;

      this.productSvc
        .updateStock(productId, newStock)
        .pipe(
          tap((res) =>
            details.push({
              productId,
              productName,
              quantity,
              orderId,
            })
          )
        )
        .subscribe();
    });

    return details;
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(tap((products: Product[]) => (this.cart = products)))
      .subscribe();
  }
}
