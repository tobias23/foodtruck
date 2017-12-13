import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MenuPage} from "../menu/menu";
import {InfoPage} from "../info/info";
import {AnmeldelserPage} from "../anmeldelser/anmeldelser";

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


  menuPage = MenuPage;
  infoPage = InfoPage;
  anmeldelserPage = AnmeldelserPage;
  parameterData : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parameterData = navParams.get("paramData");

  }

  ionViewDidLoad() {

  }

}
