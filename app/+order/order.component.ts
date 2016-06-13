import {Component, Input, OnInit, Output} from '@angular/core';

import {NavController, Refresher} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';

import {DetailComponent} from '../+detail/detail.component';

import {CartIndicatorComponent, CartComponent, CartService} from '../+cart/index';
import {Pizza, PizzaSearchPipe, PizzaService} from '../shared/index';

@Component({
  templateUrl: 'build/+order/order.component.html',
  directives: [CartIndicatorComponent],
  pipes: [PizzaSearchPipe]
})
export class OrderComponent implements OnInit {
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
    this.nav.push(DetailComponent, {
      id: id
    });
  }

  openCart() {
    this.nav.push(CartComponent);
  }

  addToCart($event, pizza: Pizza) {
    $event.stopPropagation();

    this.cartService.addCartItem(pizza);
  }
}
