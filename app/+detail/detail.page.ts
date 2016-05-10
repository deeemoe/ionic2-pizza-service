import {Page, NavController, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/+detail/detail.page.html'
})
export class DetailPage {
  constructor(private nav: NavController, navParams: NavParams) {
  }
}
