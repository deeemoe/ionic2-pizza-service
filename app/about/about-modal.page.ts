import {Page, ViewController} from 'ionic-angular';

@Page({
  templateUrl: 'build/about/about-modal.page.html'
})
export class AboutModalComponent {
  constructor(private viewCtrl: ViewController) {}
}