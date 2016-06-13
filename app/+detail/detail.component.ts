import {Component, OnInit} from '@angular/core';

import {NavController, NavParams} from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import {Pizza, PizzaService} from '../shared/index';

@Component({
  templateUrl: 'build/+detail/detail.component.html'
})
export class DetailComponent implements OnInit {
  pizza: Pizza;

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private pizzaService: PizzaService
  ) {}

  ngOnInit(): void {
    this.pizzaService
      .getPizza(this.navParams.get('id'))
      .toPromise()
      .then(pizza => this.pizza = pizza);
  }
}
