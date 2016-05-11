import {App, IonicApp, Modal, NavController, Platform, Toast} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import 'rxjs/add/operator/distinctUntilChanged';

import {AboutModalPage} from './about/index';
import {OrderPage} from './+order/index';

import {PizzaService} from './shared/index';
import {CartPage, CartService} from './+cart/index';

@App({
  templateUrl: 'build/app.html',
  providers: [CartService, PizzaService],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class PizzaApp {
  rootPage: any = OrderPage;
  private nav: NavController;
  private pages = {};

  constructor(
    private app: IonicApp,
    private platform: Platform,
    private cartService: CartService
  ) {
    this.initializeApp();
    this.pages = {
      'OrderPage': OrderPage,
      'CartPage': CartPage
    };
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.nav = this.app.getComponent('nav');

      this.cartService
        .statusChanged
        .distinctUntilChanged()
        .subscribe(data => {
          console.log(data);
          const toastText = data.type === 'add' ? 'Erfolgreich hinzugefügt' : 'Erfolgreich entfernt';

          const toast = Toast.create({
            message: toastText,
            duration: 1000
          });

          this.nav.present(toast);
        });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openAboutModal() {
    const modal = Modal.create(AboutModalPage);
    this.nav.present(modal)
  }

  openPage(pageName) {
    const component = this.pages[pageName];
    if (!component) {
      return;
    }
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(component);
  }
}
