import {AfterViewInit, OnInit, Output} from 'angular2/core';
import {Alert, NavController, Page} from 'ionic-angular';

import {CartItem, CartService} from './shared/index';


@Page({
  templateUrl: 'build/+cart/cart.page.html'
})
export class CartPage implements OnInit {
  cart: CartItem[] = [];

  constructor(private cartService: CartService, private nav: NavController) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  onPageDidEnter(): void {
    if (this.cart.length) {
      return;
    }

    let alert = Alert.create({
      title: '<b>Dein Warenkorb ist leer!</b>',
      subTitle: 'Füge zuerst Produkte aus Unserem Angebot zu Deinem Warenkorb hinzu.',
      buttons: ['OK']
    });
    this.nav.present(alert);
  }

  calcTotalSum() {
    return this.cartService.calcTotalSum();
  }

  removeFromCart(index: number): void {
    this.cartService.removeCartItem(index);
  }
}
