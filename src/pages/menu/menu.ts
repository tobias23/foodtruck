import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
/**
menuer - variable that will contain an array of our menu's.
data - a variable that will hold all the data we pass to this page through navParams.
 */
  menuer :any;
  data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = navParams.data;

  }
/**
ionViewWillEnter() - what happens when this page is entered.
 */
  ionViewWillEnter() {
    this.getMenuer();
  }

/**
getMenuer() - this method uses a http call to get all the data from our menur.json file and passes it to the method getMenu()
 */
  getMenuer() {
    this.http.get('assets/data/menuer.json').map((res) => res.json()).subscribe(data => this.getMenu(data));
  };

/**
getMenu(menuer) - this method checks if the foodtruckKey of the foodtruck we are on is matching the ones from the menu data, if it does we add to our menu array.
 @menuer - Array of json objects, containing menu's
 */
  getMenu(menuer){
   for(let menu of menuer){
     if(menu.foodtruckKey == this.navParams.data.foodtruckKey){
       this.menuer = menu.menu;

     }
   }
  }

}
