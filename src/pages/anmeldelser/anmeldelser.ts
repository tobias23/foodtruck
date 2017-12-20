import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from "@angular/http";

@IonicPage()
@Component({
  selector: 'page-anmeldelser',
  templateUrl: 'anmeldelser.html',
})
export class AnmeldelserPage {

  anmeldelserArray : any;
  data : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.data = navParams.data;
  }

  ionViewWillEnter() {
    this.getAnmeldelser();
    console.log('ionViewDidLoad AnmeldelserPage');
  }

  getAnmeldelser(){
 this.http.get('assets/data/anmeldelser.json').map((res) => res.json()).subscribe(data => this.getAnmeldelse(data));
  }


  getAnmeldelse(anmeldelser){
    for(let anmeldelse of anmeldelser){
      if(anmeldelse.foodtruckKey == this.navParams.data.foodtruckKey){
        this.anmeldelserArray = anmeldelse.anmeldelser;
        this.getStarPic(this.anmeldelserArray);
      }
    }
  }

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
