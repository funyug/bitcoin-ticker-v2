import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {AlertsPage} from "../alerts/alerts";
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";
import {GoogleAnalytics} from "@ionic-native/google-analytics";

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
  alert: {  ExchangeId: number, AlertPrice: number, PriceType: number, Operator: number, DeviceId:string} = {
    ExchangeId: null,
    AlertPrice: null,
    PriceType: null,
    Operator:null,
    DeviceId:localStorage.getItem("device_id")
  };
  error :string="";
  button_disabled:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http,private ga: GoogleAnalytics,private admobFree: AdMobFree) {

    this.ga.startTrackerWithId('UA-104875174-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('Add Alert Page');
        // Tracker is ready
        // You can now track pages or set additional information such as AppVersion or UserId
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));

    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting: false,
      id:"ca-app-pub-2010696718988879/6556553468",
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then(() => {
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here

      })
      .catch(e => console.log(e));
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
    if(this.alert.PriceType == null) {
      this.error = "Please select the type";
      this.button_disabled = 0;
      return;
    }
    if(this.alert.Operator == null) {
      this.error = "Please select the operator";
      this.button_disabled = 0;
      return;
    }
    this.http.post(`http://shivamchawla.net:3001/alerts`,this.alert)
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
        this.error = "Please check your connection or try after sometime";
        this.button_disabled = 0;
      });
  }

  public convertToNumber(event):number {  return +event; }



}
