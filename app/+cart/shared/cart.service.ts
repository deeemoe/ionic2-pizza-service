import {Injectable} from 'angular2/core';

import {Pizza} from '../../shared/index';
import {CartItem} from './cart-item.model';

@Injectable()
export class CartService {
  cart: CartItem[] = [];

  getCart(): CartItem[] {
    return this.cart;
  };

  addCartItem(pizza: Pizza): void {
    this.cart.push({
      name: pizza.name,
      price: pizza.price
    });
  };

  removeCartItem(index): void {
    this.cart.splice(index, 1);
  };
}