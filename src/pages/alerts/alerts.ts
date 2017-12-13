import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";
import {GoogleAnalytics} from "@ionic-native/google-analytics";
import {Http, RequestOptions} from "@angular/http";
import {AddAlertPage} from "../add-alert/add-alert";

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
  p: number = 1;
  device_id:string;
  alerts_page:any;
  error:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,  public http:Http, private ga: GoogleAnalytics,private admobFree: AdMobFree) {
    this.alerts = [];
    this.device_id = localStorage.getItem('device_id');
    this.alerts_page = AddAlertPage;
    this.getAlerts();
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
    this.http.get(`http://shivamchawla.net:3002/alerts?device_id=`+this.device_id)
      .subscribe(data => {
        data = data.json();
        this.alerts = data["Data"];
        for(let i = 0; i<this.alerts.length;i++) {
           if(this.alerts[i].ExchangeId == 1) {
             this.alerts[i].Exchange = "CoinSecure";
           }
           if(this.alerts[i].ExchangeId == 2) {
             this.alerts[i].Exchange = "Koinex";
           }
           if(this.alerts[i].ExchangeId == 3) {
             this.alerts[i].Exchange = "PocketBits";
           }
           if(this.alerts[i].ExchangeId == 4) {
             this.alerts[i].Exchange = "Zebpay";
           }
        }
      });
  }

  removeAlert(id) {
    this.http.delete(`http://shivamchawla.net:3002/alerts`,new RequestOptions({
      body: {DeviceId:this.device_id,Id:id}
    }))
      .subscribe(data => {
        data = data.json();
        if(data['Success'] == 1) {
          this.getAlerts()
        }
        else {
          this.error = data["Data"];
        }
      },error=> {
        this.error = "Please check your connection or try after sometime";
      });
  }

   openPage(p) {
    this.navCtrl.push(p);
  }



}
