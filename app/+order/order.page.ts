import {Input, OnInit, Output} from '@angular/core';

import {NavController, Page, Refresher} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

import {DetailPage} from '../+detail/detail.page';

import {CartIndicatorComponent, CartPage, CartService} from '../+cart/index';
import {Pizza, PizzaSearchPipe, PizzaService} from '../shared/index';

@Page({
  templateUrl: 'build/+order/order.page.html',
  directives: [CartIndicatorComponent],
  pipes: [PizzaSearchPipe]
})
export class OrderPage implements OnInit {
  pizzas: Pizza[] = [];
  loading: boolean;
  pizzaSource: Observable<Pizza[]>;
  @Input() search: string;

  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService,
    private nav: NavController
  ) {}

  ngOnInit() {
    this.loading = true;
    const subscription = this.pizzaService.getPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
      this.loading = false;
      subscription.unsubscribe();
    }, () => this.loading = false);
  }

  doRefresh(refresher: Refresher) {
    const subscription = this.pizzaService.getPizzas().subscribe(pizzas => {
      this.pizzas = pizzas;
      refresher.complete()
      subscription.unsubscribe();
    }, () => refresher.complete());
  }

  openPizza(id: number) {
    this.nav.push(DetailPage, {
      id: id
    });
  }

  openCart() {
    this.nav.push(CartPage);
  }

  addToCart($event, pizza: Pizza) {
    $event.stopPropagation();

    this.cartService.addCartItem(pizza);
  }
}
