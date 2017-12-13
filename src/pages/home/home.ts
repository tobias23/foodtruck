import { Component, ViewChild, ElementRef } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public http: Http, private modalCtrl: ModalController) {
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
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,

      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });

      this.getMarkers();

    }, (err) => {
      console.log(err);
    });
  };



  getMarkers() {
    this.http.get('assets/data/markers.json').map((res) => res.json()).subscribe(data => this.getLatLong(data));
  };

  getLatLong(markers) {
    for (let marker of markers) {
      this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + marker.address + ', ' + marker.postalCode).map((res) => res.json()).subscribe(data => this.addMarkersToMap(data, marker));
    }
  }

  addMarkersToMap(marker, markerData) {
    let icon = {
      url: 'assets/imgs/Foodtruck.png',
      scaledSize: new google.maps.Size(50, 50),
    };
    marker = new google.maps.Marker({
      map: this.map,
      animation:google.maps.Animation.DROP,
      position: marker.results[0].geometry.location,
      icon: icon

    });
      this.addInfoWindow(marker, markerData);
    }





  addInfoWindow(marker, markerData) {
    var content = document.createElement('div');
    content.innerHTML = markerData.name;
    var button = content.appendChild(document.createElement("input"));
    button.type = 'button';
    button.id = "click";
    button.value = "Åben Profilside";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListenerOnce(infoWindow, 'domready', ()=> {
      document.getElementById('click').addEventListener('click', () =>{
        this.openProfile(markerData);
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

  openProfile(markerData){
    this.navCtrl.push(ProfilePage, { paramData: markerData})
  }

}
