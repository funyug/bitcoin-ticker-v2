import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {AlertsPage} from "../alerts/alerts";

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
  alert: {  ExchangeId: number, AlertPrice: number, AlertType: number, DeviceId:string} = {
    ExchangeId: null,
    AlertPrice: null,
    AlertType: null,
    //DeviceId:localStorage.getItem("device_id")
    DeviceId:"test123"
  };
  error :string="";
  button_disabled:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
  }

  postAlert() {
    this.button_disabled = 1;
    if(this.alert.ExchangeId == null) {
      this.error = "Please select an exchange";
      this.button_disabled = 0;
      return;
    }
    if(!this.alert.AlertPrice) {
      this.error = "Please enter the price";
      this.button_disabled = 0;
      return;
    }
    if(this.alert.AlertType == null) {
      this.error = "Please select the type";
      this.button_disabled = 0;
      return;
    }
    this.http.post(`http://localhost:3001/alerts`,this.alert)
      .subscribe(data => {
        data = data.json();
        if(data['Success'] == 1) {
          this.navCtrl.push(AlertsPage);
        }
        else {
          this.error = data["Data"];
        }
        this.button_disabled = 0;
      },error=> {
        this.error = "Please check your connection";
        this.button_disabled = 0;
      });
  }


}
