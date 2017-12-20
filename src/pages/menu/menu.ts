import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  menuer :any;
  data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = navParams.data;

  }

  ionViewWillEnter() {
    this.getMenuer();
  }


  getMenuer() {
    this.http.get('assets/data/menuer.json').map((res) => res.json()).subscribe(data => this.getMenu(data));
  };

  getMenu(menuer){
   for(let menu of menuer){
     if(menu.foodtruckKey == this.navParams.data.foodtruckKey){
       this.menuer = menu.menu;

     }
   }
  }

}
