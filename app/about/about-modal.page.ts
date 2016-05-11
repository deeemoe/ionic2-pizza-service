import {Page, ViewController} from 'ionic-angular';

@Page({
  templateUrl: 'build/about/about-modal.page.html'
})
export class AboutModalPage {
  constructor(private viewCtrl: ViewController) {}

  closeModal(): void {
    this.viewCtrl.dismiss();
  }
}