import {App, IonicApp, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {OrderPage} from './+order/order.page';

import {PizzaService} from './shared/index';
import {CartPage, CartService} from './+cart/index';

@App({
  templateUrl: 'build/app.html',
  providers: [CartService, PizzaService],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class PizzaApp {
  rootPage: any = OrderPage;
  pages: Array<{title: string, component: any}>

  constructor(
    private app: IonicApp,
    private platform: Platform
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Bestellen', component: OrderPage },
      { title: 'Warenkorb', component: CartPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
