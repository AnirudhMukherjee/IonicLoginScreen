import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data1: any[];

  vendors = {
    distance: '12000',
    rating: '0',
    price: '10',
    lat: 19.2115,
    lon: 72.8737
}
  
  constructor(public navCtrl: NavController, private auth: AuthServiceProvider, private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.vendors.lat =  resp.coords.latitude;
      this.vendors.lon =  resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
    this.auth.vendorService(this.vendors).then(userResponse => {
      console.log(userResponse);
      console.log(userResponse.code);
      for(let i = 0;i<userResponse.data.length;i++){
        this.data1 = userResponse.data;
      }
      console.log(this.data1);
    });
  }


}
