import {Component, ViewChild} from '@angular/core';

import {App, ionicBootstrap, Modal, Nav, Platform, Toast} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import 'rxjs/add/operator/distinctUntilChanged';

import {AboutModalComponent} from './about/index';
import {OrderComponent} from './+order/index';

import {PizzaService} from './shared/index';
import {CartComponent, CartService} from './+cart/index';

@Component({
  templateUrl: 'build/app.html'
})
class PizzaAppComponent {
  rootPage: any = OrderComponent;
  cartItemCount = 0;
  toastDuration = 500;
  private pages = {};
  @ViewChild(Nav) nav: Nav;

  constructor(
    private app: App,
    private platform: Platform,
    private cartService: CartService
  ) {
    this.initializeApp();
    this.pages = {
      'OrderPage': OrderComponent,
      'CartPage': CartComponent
    };
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // subscribe to cart changes
      this.cartService
        .statusChanged
        .subscribe(data => {
          this.cartItemCount = data.totalCount;

          const toastText = data.type === 'add' ? 'Erfolgreich hinzugefügt' : 'Erfolgreich entfernt';

          const toast = Toast.create({
            message: toastText,
            duration: this.toastDuration
          });

          this.nav.present(toast);
        });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openAboutModal() {
    const modal = Modal.create(AboutModalComponent);
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

ionicBootstrap(PizzaAppComponent, [OrderComponent, CartService, PizzaService], {
  backButtonText: ''
});