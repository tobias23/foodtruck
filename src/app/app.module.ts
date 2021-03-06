import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Geolocation} from "@ionic-native/geolocation";
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ProfilePage} from "../pages/profile/profile";
import {MenuPage} from "../pages/menu/menu";
import {InfoPage} from "../pages/info/info";
import {AnmeldelserPage} from "../pages/anmeldelser/anmeldelser";
import {TruckService} from "../service/truckService";




@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    MenuPage,
    InfoPage,
    AnmeldelserPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    MenuPage,
    InfoPage,
    AnmeldelserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    HttpModule,
    TruckService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
