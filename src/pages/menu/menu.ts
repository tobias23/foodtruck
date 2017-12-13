import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  name = "";
  menuer :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.name = navParams.data.name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.getMenuer();

  }
  getMenuer() {
    this.http.get('assets/data/menuer.json').map((res) => res.json()).subscribe(data => this.getMenu(data));
  };

  getMenu(menuer){
   for(let menu of menuer){
     if(menu.menuKey == this.navParams.data.menuKey){
       this.menuer = menu.menu;

     }
   }
  }

}
