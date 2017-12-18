import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MenuPage} from "../menu/menu";
import {InfoPage} from "../info/info";
import {AnmeldelserPage} from "../anmeldelser/anmeldelser";
import { TruckService } from "../../service/truckService";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  menuPage : any = MenuPage;
  infoPage  : any= InfoPage;
  anmeldelserPage : any = AnmeldelserPage;
  parameterData : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private truckService: TruckService) {
    this.parameterData = navParams.get("paramData");


  }

  ionViewDidEnter() {

  }
  openWebsite(){

  }

  routeClicked() {
    this.navCtrl.pop();
    this.truckService.calculateAndDisplayRoute(this.parameterData, this.navParams.get('paramStart'));
  }

}
