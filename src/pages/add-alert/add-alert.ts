import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AddAlertPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-alert',
  templateUrl: 'add-alert.html',
})
export class AddAlertPage {
  alert: {  ExchangeId: number, AlertPrice: number, AlertType: number} = {
    ExchangeId: null,
    AlertPrice: null,
    AlertType: null
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
