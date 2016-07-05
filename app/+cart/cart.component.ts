import {AfterViewInit, Component, OnInit, Output} from '@angular/core';

import {Alert, NavController} from 'ionic-angular';

import {CartItem, CartService} from './shared/index';


@Component({
  templateUrl: 'build/+cart/cart.component.html'
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];

  constructor(private cartService: CartService, private nav: NavController) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  ionViewDidEnter(): void {
    if (this.cart.length) {
      return;
    }

    let alert = Alert.create({
      title: '<b>Dein Warenkorb ist leer!</b>',
      subTitle: 'Füge zuerst Produkte aus Unserem Angebot zu Deinem Warenkorb hinzu.',
      buttons: ['OK']
    });
    setTimeout(() => this.nav.present(alert), 300);
  }

  calcTotalSum() {
    return this.cartService.calcTotalSum();
  }

  removeFromCart(index: number): void {
    this.cartService.removeCartItem(index);
  }
}
