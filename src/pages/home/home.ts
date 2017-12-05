import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {



  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public http: Http) {
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
      let content = "<h4>Her er jeg.</h4>";

      this.addInfoWindow(marker, content);

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
    console.log("abe");
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let foodtruckMarker = new google.maps.Marker({position: position, title: marker.name, icon: {url: 'assets/imgs/Foodtruck.png', scaledSize: { width: 75, height: 75}}});
      console.log(position.lat());
      foodtruckMarker.setMap(this.map);
      let content = marker.stuff;
      this.addInfoWindow(foodtruckMarker, content);
    }
  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

}
