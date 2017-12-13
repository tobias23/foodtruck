import { Injectable } from "@angular/core";


declare var google;

@Injectable()
export class TruckService{

  constructor() {

  }

  calculateAndDisplayRoute(marker, startDestination) {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    directionsService.route({
      origin: startDestination,
      destination: marker.address + ', ' + marker.postalCode,
      travelMode: 'WALKING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }





}
