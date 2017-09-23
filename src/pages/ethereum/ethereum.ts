import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-ethereum',
  templateUrl: 'ethereum.html'
})
export class EthereumPage {
  data: object;
  avgPrice: number;
  timer:any;

  constructor(public navCtrl: NavController, public http:Http, private ga: GoogleAnalytics,private admobFree: AdMobFree) {
    this.getPrice();
    this.timer = setInterval(() => {
      this.getPrice();
    },50000);
    this.data = {};
    this.avgPrice = 0;
    this.ga.startTrackerWithId('UA-104875174-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('Ethereum Page');
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
    if(!this.data) {
      this.data = {};
    }
    this.getBitfinexBtcPrice();
    this.getBittrexPrice();
    this.getBitfinexPrice();
    this.getGdaxPrice();
  }
  getAveragePrice() {
    let totalPrice = 0;
    let totalExchanges = 0;
    if(this.data["bitfinexBuyPrice"]) {
          totalPrice = totalPrice + parseInt(this.data["bitfinexBuyPrice"]);
          totalExchanges++;
    }
    if(this.data["bitfinexSellPrice"]) {
          totalPrice = totalPrice + parseInt(this.data["bitfinexSellPrice"]);
          totalExchanges++;
    }
    if(this.data["gdaxBuyPrice"]) {
          totalPrice = totalPrice + parseInt(this.data["gdaxBuyPrice"]);
          totalExchanges++;
    }
    if(this.data["gdaxSellPrice"]) {
          totalPrice = totalPrice + parseInt(this.data["gdaxSellPrice"]);
          totalExchanges++;
    }
    if(this.data["bittrexBuyPrice"] && this.data["bitcoin_rate"]) {
          totalPrice = totalPrice + (parseFloat(this.data["bittrexBuyPrice"]) * this.data["bitcoin_rate"]);
          totalExchanges++;
    }
    if(this.data["bittrexSellPrice"] && this.data["bitcoin_rate"]) {
          totalPrice = totalPrice + (parseFloat(this.data["bittrexSellPrice"]) * this.data["bitcoin_rate"]);
          totalExchanges++;
    }
    this.avgPrice = totalPrice/totalExchanges;
  }
  getBittrexPrice() {
    this.http.get(`https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-eth`)
      .subscribe(data => {
        let priceData = data.json();
        this.data["bittrexBuyPrice"] = priceData.result[0].Ask;
        this.data["bittrexSellPrice"] = priceData.result[0].Bid;
        this.getAveragePrice();
      });
  }
  getBitfinexPrice() {
    this.http.get(`https://api.bitfinex.com/v1/pubticker/ethusd`)
      .subscribe(data => {
        let priceData = data.json();
        this.data["bitfinexBuyPrice"] = priceData.ask;
        this.data["bitfinexSellPrice"] = priceData.bid;
        this.getAveragePrice();
      });
  }
  getGdaxPrice() {
    this.http.get(`https://api.gdax.com/products/ETH-USD/ticker`)
      .subscribe(data => {
        let priceData = data.json();
        this.data["gdaxBuyPrice"] = priceData.ask;
        this.data["gdaxSellPrice"] = priceData.bid;
        this.getAveragePrice();
      });
  }
  getBitfinexBtcPrice() {
    this.http.get(`https://api.bitfinex.com/v1/pubticker/btcusd`)
      .subscribe(data => {
        let priceData = data.json();
        this.data["bitcoin_rate"] = priceData.bid;
        this.getAveragePrice();
      });
  }


}
