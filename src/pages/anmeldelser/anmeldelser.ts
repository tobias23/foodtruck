import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-anmeldelser',
  templateUrl: 'anmeldelser.html',
})
export class AnmeldelserPage {

  data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.data;
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad AnmeldelserPage');
  }

}
