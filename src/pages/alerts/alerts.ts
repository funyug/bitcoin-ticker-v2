import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {Http} from "@angular/http";

/**
 * Generated class for the AlertsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html',
})
export class AlertsPage {
  alerts:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public http:Http, private ga: GoogleAnalytics,private admobFree: AdMobFree) {
    this.ga.startTrackerWithId('UA-104875174-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('Alerts Page');
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

  getAlerts() {
    this.http.get(`http://shivamchawla.net:3001/bitcoin-price`)
      .subscribe(data => {
        this.alerts = data.json();
      });
  }



}
