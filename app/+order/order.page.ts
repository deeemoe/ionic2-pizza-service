import {NavController, Page, Refresher} from 'ionic-angular';
import {Input, OnInit, Output} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {DetailPage} from '../+detail/detail.page';

import {CartService} from '../+cart/index';
import {Pizza, PizzaSearchPipe, PizzaService} from '../shared/index';

@Page({
  templateUrl: 'build/+order/order.page.html',
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

  private loadPizzas(refresher?: Refresher) {
    if (!refresher) {
      this.loading = true;
    }
    this.pizzaSource.subscribe(pizzas => {
      this.pizzas = pizzas;
      this.loading = false;
      if (refresher) {
        refresher.complete();
      }
    }, () => this.loading = false);
  }

  ngOnInit() {
    this.pizzaSource = this.pizzaService.getPizzas();
    this.loadPizzas();
  }

  doRefresh(refresher: Refresher) {
    this.loadPizzas(refresher);
  }

  openPizza(id: number) {
    this.nav.push(DetailPage, {
      id: id
    });
  }

  addToCart($event, pizza: Pizza) {
    $event.stopPropagation();

    this.cartService.addCartItem(pizza);
  }
}
