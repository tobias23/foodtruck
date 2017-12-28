import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  /**
   * data - variable that holds the data we pass to the page
   */
  data : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = navParams.data;
  }


}
