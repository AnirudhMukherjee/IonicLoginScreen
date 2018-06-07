import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {HomePage} from '../home/home'

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[AuthServiceProvider]
})

export class LoginPage {
  loading: Loading;
  registerCredentials = {phoneNumber: ""};
  jsonObj:any;
 
  constructor(private nav: NavController, private auth: AuthServiceProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
 
  public createAccount() {
    this.nav.push('RegisterPage');
  }
 
  public login() {
    this.showLoading();

    this.registerCredentials.phoneNumber = "+91" + this.registerCredentials.phoneNumber;
    this.jsonObj = {"phoneNumber": this.registerCredentials.phoneNumber};
    console.log(this.jsonObj);
    this.auth.login(this.registerCredentials).then(data=>{
      if (data!='login failed') {        
            console.log(data);
            this.nav.push(HomePage);
          }
    })
    .catch((message)=>{
      this.showError(message);
    });

  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
