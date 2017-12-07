import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import {ProfilePage} from "../profile/profile";

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {



  @ViewChild('map') mapElement: ElementRef;
  map: any;
  infoWindows: any;


  constructor(public navCtrl: NavController, public geolocation: Geolocation, public http: Http) {
    this.infoWindows = [];
  }

  ionViewWillEnter() {
    this.loadMap()

  }

  loadMap(){

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,

      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      this.addInfoWindow(marker);

      this.getMarkers();

    }, (err) => {
      console.log(err);
    });
  };



  getMarkers() {
    this.http.get('assets/data/markers.json').map((res) => res.json()).subscribe(data => {console.log(data)});
    this.http.get('assets/data/markers.json').map((res) => res.json()).subscribe(data => this.addMarkersToMap(data));
  };


  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let foodtruckMarker = new google.maps.Marker({position: position, title: marker.name, icon: {url: 'assets/imgs/Foodtruck.png', scaledSize: { width: 75, height: 75}}});
      console.log(position.lat());
      foodtruckMarker.setMap(this.map);

      this.addInfoWindow(foodtruckMarker);
    }
  }

  addInfoWindow(marker) {
    let button = '<button type="button" id="click" ion-button>Åben Profilside</button>';
    let infoWindowContent = '<div id="content"><h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1>'+ button +'</div>';
    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });
    google.maps.event.addListenerOnce(infoWindow, 'domready', ()=> {
      document.getElementById('click').addEventListener('click', () =>{
        this.openProfile(marker.title);
      })
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });

    this.infoWindows.push(infoWindow);
  }

  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  openProfile(title){
    this.navCtrl.push(ProfilePage);
  }

}
