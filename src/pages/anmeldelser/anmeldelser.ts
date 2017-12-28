import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-anmeldelser',
  templateUrl: 'anmeldelser.html',
})
/**
anmeldelserArray - Variable that we use to hold all reviews of a foodtruck
 */
export class AnmeldelserPage {

  anmeldelserArray : any;
  data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = navParams.data;
  }
  /**
  ionViewWillEnter() - What happends when you enter the page
   */
  ionViewWillEnter() {
    this.getAnmeldelser();
    console.log('ionViewDidLoad AnmeldelserPage');
  }
  /**
  getAnmeldelser() - makes a http call to hour json file and collects the data and pass it on to getAnmeldelse();
   */
  getAnmeldelser(){
 this.http.get('assets/data/anmeldelser.json').map((res) => res.json()).subscribe(data => this.getAnmeldelse(data));
  }

  /**
  getAnmeldelse(anmeldelser) - this method goes through our reviews and adds the one that has the same foodtuckKey as the foodtruck we are on to our array.
  Then it calls the method getStarPic();
   @anmeldelser - array of json objects, containing reviews from all foodtrucks.
   */

  getAnmeldelse(anmeldelser){
    for(let anmeldelse of anmeldelser){
      if(anmeldelse.foodtruckKey == this.navParams.data.foodtruckKey){
        this.anmeldelserArray = anmeldelse.anmeldelser;
        this.getStarPic(this.anmeldelserArray);
      }
    }
  }
  /**
  getStartPic(anmeldelser) takes our array of reviews and replaces the number of stars and changes it to a picture matching the number.
   @anmeldelser - array of json objects, containing reviews from 1 foodtrucks.
   */

  getStarPic(anmeldelser){
    for(let anmeldelse of anmeldelser){
      if(anmeldelse.anmeldelse.stjerner == "5"){
        anmeldelse.anmeldelse.stjerner = "assets/imgs/stjerner/5Stjerner.PNG";

      } else if(anmeldelse.anmeldelse.stjerner == "4"){
        anmeldelse.anmeldelse.stjerner = "assets/imgs/stjerner/4Stjerner.PNG"

      }else if(anmeldelse.anmeldelse.stjerner == "3"){
        anmeldelse.anmeldelse.stjerner = "assets/imgs/stjerner/3Stjerner.PNG"

      }else if(anmeldelse.anmeldelse.stjerner == "2"){
        anmeldelse.anmeldelse.stjerner = "assets/imgs/stjerner/2Stjerner.PNG"

      }else if(anmeldelse.anmeldelse.stjerner == "1"){
        anmeldelse.anmeldelse.stjerner = "assets/imgs/stjerner/1Stjerne.PNG"
      }

    }

    }

}
