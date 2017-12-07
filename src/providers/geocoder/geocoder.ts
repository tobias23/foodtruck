import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeGeocoder,
  NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';


@Injectable()
export class GeocoderProvider {

  constructor(public http       : Http,
              private _GEOCODE  : NativeGeocoder)
  {

  }


  /**
   *
   * Perform forwardGeocode operation and return latitude/longitude details
   *
   * @public
   * @method forwardGeocode
   * @return {Promise}
   *
   */
  forwardGeocode(keyword : string) : Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
      this._GEOCODE.forwardGeocode(keyword)
        .then((coordinates : NativeGeocoderForwardResult) =>
        {
          let str : string   = `The coordinates are latitude=${coordinates.latitude} and longitude=${coordinates.longitude}`;
          resolve(str);
        })
        .catch((error: any) =>
        {
          console.log(error);
          reject(error);
        });
    });
  }

}
