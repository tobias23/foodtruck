import { Component, ViewChild, ElementRef } from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
import {ProfilePage} from "../profile/profile";
import { TruckService } from "../../service/truckService";


declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  /**
  startDes variable we use to hold your current posistion
  timesLoaded variable we use to see if it is the first time you load the program
  selectedVal variable we set after what categori the map will sort after, default "Alle"
   */
 startDes: any;
 timesLoaded = 0;
 selectedVal = "Alle";


  @ViewChild('map') mapElement: ElementRef;
  map: any;
  infoWindows: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation,
              public http: Http, private modalCtrl: ModalController, private truckService: TruckService) {
    this.infoWindows = [];


  }
  /**
   ionViewWillEnter() - What happends when you enter this view
   */
  ionViewWillEnter() {
    this.loadMap();

  }
  /**
    categoryFilter(kategori) - method that is run when the categori field changes, sets selectedVal to chosen categori
   @kategori - value of chosen categori in interface
 */
  categoryFilter(kategori){
    this.selectedVal = kategori;
    this.loadMap();
  }

/**
  loadMap() - this method creates our map with the googleMaps api. we check whether it is first time we use the app, if it is we open and close the profile page
  to not get a bug with our tabs. We use mapOptions to set the settings of our map and use our latLng variable to get the current position and set the map after those coordinates.
  Afterwards we create a marker at the position.
 */
  loadMap(){
    if(this.timesLoaded == 0){
      this.openProfile("first load");
      this.navCtrl.pop();
      this.timesLoaded = 1;
    }
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.startDes = latLng;

      let mapOptions = {
        center: latLng,
        zoom: 13,
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


/**
getMarkers() - This method uses a http call to collect our local data form a json file and sends the data to a the method getLatLong()
 */
  getMarkers() {
    this.http.get('assets/data/markers.json').map((res) => res.json()).subscribe(data => this.getLatLong(data));

  };

/**
This method checks the selectedVal variable, if the selectedVal is at default it will just get all foodtrucks, if not it will get those with the right categori
with a http call and send it to the method addMarkersToMap()
 @markers - array of markers
 */
  getLatLong(markers) {
    if(this.selectedVal != "Alle"){
      let temp = [];
      for(let marker of markers){
        if(marker.category == this.selectedVal){
          temp.push(marker);

        }
      }
      markers = temp;
    }
    for (let marker of markers) {

      this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + marker.address + ', ' + marker.postalCode).
      map((res) => res.json()).subscribe(data => this.addMarkersToMap(data, marker));
    }
  }

/**
addMarkersToMap(marker, markerData) - This method creates our markers and adds them to the map and calls the method addInfoWindow().
 @marker - array holding 1 latitude and longitude of a adress
 @markerData - json object containing a foodtrucks varaibles
 */
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



/**
  addInfoWindow(marker, markerData) - This method creates a information window for each of our markers and puts the data into them.
  At the end it adds them to our infoWindows array.
 @markers - array holding 1 latitude and longitude of a adress
 @markerData - json object containing a foodtrucks varaibles
 */

  addInfoWindow(marker, markerData) {
    let content = document.createElement('div');
    let title = content.appendChild(document.createElement("strong"));
    title.innerText = markerData.name;
    if(markerData.hasOwnProperty("banner")){
      let img = content.appendChild(document.createElement("img"));
      img.src = markerData.banner;
      img.className = "infoBanner";
    }
    let category = content.appendChild(document.createElement("p"));
    category.innerText = "Kategori : " + markerData.category;
    let button = content.appendChild(document.createElement("input"));
    button.className = "infoButton";
    button.type = 'button ion-button';
    button.id = "click";
    button.value = "Åben Profilside";
    let buttonRoute = content.appendChild(document.createElement("input"));
    buttonRoute.type = 'button';
    buttonRoute.className = "infoButton";
    buttonRoute.id = "route";
    buttonRoute.value = "Rutevejledning";
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListenerOnce(infoWindow, 'domready', ()=> {
      document.getElementById('click').addEventListener('click', () =>{
        this.openProfile(markerData);
      })
      document.getElementById('route').addEventListener('click', () => {
        this.truckService.calculateAndDisplayRoute(markerData, this.startDes);
      })
    });
    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });

    this.infoWindows.push(infoWindow);
  }
/**
closeAllInfoWindows() - this method makes sure that only 1 window can be open at any time.
 */
  closeAllInfoWindows() {
    for(let window of this.infoWindows) {
      window.close();
    }
  }

  /**
  openProfile(markerData) - this method opens the foodtruck profile and sends all the information associated with it to the profilePage view.
   @markerData - json object containing a foodtrucks varaibles
   */

  openProfile(markerData){
    this.navCtrl.push(ProfilePage, { paramData: markerData, paramStart: this.startDes})
  }

}
