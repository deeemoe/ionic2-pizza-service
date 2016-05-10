import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Pizza} from './pizza.model';

@Injectable()
export class PizzaService {

  constructor(private http: Http) {}

  getPizza(): Observable<Pizza[]> {
    return this.http
        .get('assets/pizza.json')
        .map((res: Response) => res.json());
  }
}