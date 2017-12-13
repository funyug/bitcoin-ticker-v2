import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import {NgxPaginationModule} from 'ngx-pagination';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree } from '@ionic-native/admob-free';
import {EthereumPage} from "../pages/ethereum/ethereum";
import {AllPage} from "../pages/all/all";
import {CoinPage} from "../pages/coin/coin";
import {AlertsPage} from "../pages/alerts/alerts";
import {AddAlertPage} from "../pages/add-alert/add-alert";
import {Push} from "@ionic-native/push";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EthereumPage,
    AllPage,
    CoinPage,
    AlertsPage,
    AddAlertPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    NgxPaginationModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EthereumPage,
    AllPage,
    CoinPage,
    AlertsPage,
    AddAlertPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleAnalytics,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Push
  ]
})
export class AppModule {
  constructor() {
    localStorage.clear();
  }
}
