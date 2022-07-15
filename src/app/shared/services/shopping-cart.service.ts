import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../../pages/products/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  products: Product[] = [];

  private cartSubject = new BehaviorSubject<Product[]>([]);
  private totalSubject = new BehaviorSubject<number>(0);
  private quantitySubject = new BehaviorSubject<number>(0);

  get totalAction$(): Observable<number> {
    return this.totalSubject.asObservable();
  }

  get quantityAction$(): Observable<number> {
    return this.quantitySubject.asObservable();
  }

  get cartAction$(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  updateCart(product: Product): void {
    this.addToCart(product);
    this.quantityProducts();
    this.calcTotal();
  }

  private addToCart(product: Product): void {
    const isProductInCart = this.products.find(({ id }) => id === product.id);

    if (isProductInCart) {
      isProductInCart.qty += 1;
    } else {
      this.products.push({ ...product, qty: 1 });
    }

    this.cartSubject.next(this.products);
  }

  private quantityProducts(): void {
    const total = this.products.reduce(
      (acc, product) => (acc += product.qty),
      0
    );
    this.quantitySubject.next(total);
  }

  private calcTotal(): void {
    const total = this.products.reduce(
      (acc, product) => (acc += product.price * product.qty),
      0
    );

    this.totalSubject.next(total);
  }

  resetCart(): void {
    this.products = [];
    this.cartSubject.next(this.products);
    this.quantitySubject.next(0);
    this.totalSubject.next(0);
  }
}
