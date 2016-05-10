import {Pipe, PipeTransform} from 'angular2/core';

import {Pizza} from './pizza.model';

@Pipe({
  name: 'pizzaSearch'
})
export class PizzaSearchPipe implements PipeTransform {
  transform(pizzas:Pizza[], args) : any {
    let matches: Pizza[] = [];
    const searchString = args[0];

    if (!searchString) {
        return pizzas;
    }

    pizzas.forEach(function (pizza) {
        if (pizza.name.match(new RegExp(searchString, 'i'))) {
            matches.push(pizza);
        }
    });

    return matches;
  }
}