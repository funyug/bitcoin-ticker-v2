import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: object;
  avgPrice: number;
  timer:any;
  country:string;

  constructor(public navCtrl: NavController, public http:Http, private ga: GoogleAnalytics,private admobFree: AdMobFree) {
    this.country = "india";
    this.getPrice();
    this.timer = setInterval(() => {
      this.getPrice();
    },10000);
    this.data = {};
    this.avgPrice = 0;
    this.ga.startTrackerWithId('UA-104875174-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('Homepage');
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
  ngOnDestroy() {
    clearInterval(this.timer);
  }
  getPrice() {
    this.http.get(`http://localhost:1323/bitcoin-price`)
      .subscribe(data => {
        let priceData = data.json();
        this.data = priceData;
        let totalPrice = 0;
        let totalExchanges = 0;
        if(priceData.zebpayBuyPrice) {
          totalPrice = totalPrice + priceData.zebpayBuyPrice;
          totalExchanges++;
        }
        if(priceData.zebpaySellPrice) {
          totalPrice = totalPrice + priceData.zebpaySellPrice;
          totalExchanges++;
        }
        if(priceData.coinsecureBuyPrice) {
          totalPrice = totalPrice + priceData.coinsecureBuyPrice;
          totalExchanges++;
        }
        if(priceData.coinsecureSellPrice) {
          totalPrice = totalPrice + priceData.coinsecureSellPrice;
          totalExchanges++;
        }

        if(priceData.pocketBitsBuyPrice) {
          totalPrice = totalPrice + priceData.pocketBitsBuyPrice;
          totalExchanges++;
        }
        if(priceData.pocketBitsSellPrice) {
          totalPrice = totalPrice + priceData.pocketBitsSellPrice;
          totalExchanges++;
        }

        if(priceData.koinexBuyPrice) {
          totalPrice = totalPrice + priceData.koinexBuyPrice;
          totalExchanges++;
        }
        if(priceData.koinexSellPrice) {
          totalPrice = totalPrice + priceData.koinexSellPrice;
          totalExchanges++;
        }
        this.avgPrice = totalPrice/totalExchanges;
      });
  }


}
