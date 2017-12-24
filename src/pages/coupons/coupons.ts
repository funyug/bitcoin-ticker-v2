import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";
import {GoogleAnalytics} from "@ionic-native/google-analytics";

/**
 * Generated class for the CouponsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-coupons',
  templateUrl: 'coupons.html',
})
export class CouponsPage {
  shownGroup = null;

  diseases = [
    { title: "Zebpay", description: "Get free Rs.100 worth of bitcoins on your first buy or sell on Zebpay. After installing the zebpay application, open the menu section, go to free bitcoins and enter REFSHIV6810" },
    { title: "Pocketbits", description: "Get free Rs. 200 worth of bitcoins on your first purchase of Rs.5000 worth of bitcoins. Just enter BU99-B153 in the referral code section in the signup form." },
    { title: "Koinex", description: "Get free Rs.50 in your INR wallet after your first successful trade. Use the following link to signup to get the reward : <a href='http://bit.ly/free-koinex'>http://bit.ly/free-koinex</a>" },
    { title: "Bitmex", description: "Get 10% discount on trading fees for 6 months after signing up. Use the following link to signup to get the discount : <a href='http://bit.ly/bitmex-discount'>http://bit.ly/bitmex-discount</a>" },
    { title: "Etherbit", description: "Get 5% discount on hardware wallets. Use the following link to signup to get the discount : <a href='http://bit.ly/etherbit-discount'>http://bit.ly/etherbit-discount</a>" }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private ga: GoogleAnalytics,private admobFree: AdMobFree) {
    this.ga.startTrackerWithId('UA-104875174-1')
      .then(() => {
        console.log('Google analytics is ready now');
        this.ga.trackView('Coupons Page');
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

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

}
