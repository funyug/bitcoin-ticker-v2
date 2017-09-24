import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-coin',
  templateUrl: 'coin.html'
})
export class CoinPage {
  coin_data: object;

  constructor(public navCtrl: NavController, public http:Http, private ga: GoogleAnalytics,private admobFree: AdMobFree,public navParams:NavParams) {
    let coin_symbol = this.navParams.get("symbol");
    this.getCoinData(coin_symbol);
    

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

  getCoinData(symbol) {
     let coins_data = JSON.parse(localStorage.getItem("coin_data"));
     console.log(symbol);
     let coin_data = coins_data.filter(function(coin) {
       return coin.symbol.indexOf(symbol) !== -1;
     });
     console.log(coin_data);
     if(coin_data.length == 0) {
        this.coin_data = undefined;
     }
     else {
       this.coin_data = coin_data[0];
     }
     
     this.ga.startTrackerWithId('UA-104875174-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView(this.coin_data["name"] +' Page');
        // Tracker is ready
        // You can now track pages or set additional information such as AppVersion or UserId
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
  }


}
