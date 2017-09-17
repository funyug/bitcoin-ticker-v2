import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree } from '@ionic-native/admob-free';
import {EthereumPage} from "../pages/ethereum/ethereum";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EthereumPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EthereumPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleAnalytics,
    AdMobFree,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
