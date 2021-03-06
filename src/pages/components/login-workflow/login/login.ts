import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth';
import { webClientId } from '../../../../config/config';
import { AuthData } from '../../../../providers/auth-data';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  hideSocialButtons: boolean;
  public loginForm: any;
  data: any;
  dataFb: any;

  constructor(public navCtrl: NavController, public authData: AuthData, public fb: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public googlePlus: GooglePlus, private fbook: Facebook, public afAuth: AngularFireAuth) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this.presentAlert('Username or password is incorrect')
      console.log("error");
    } else {
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: ''
      });
      loadingPopup.present();

      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authData => {
          console.log("Auth pass");
          loadingPopup.dismiss();
          this.navCtrl.push('AfterLoginPage', { data: authData });
        }, error => {
          var errorMessage: string = error.message;
          loadingPopup.dismiss().then(() => {
            this.presentAlert(errorMessage)
          });
        });
    }
  }

  recover() {
    this.navCtrl.push('RecoverPage');
  }

  createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }


  //----social login------------------------------
  loginWithFb() {
    let that = this;
    this.fbook.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        that.dataFb = res;
        that.data = null;//remove g+ data


        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(res.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then(response => {
            //alert("Firebase success: " + JSON.stringify(response));
            firebase.database().ref('/userProfile').child(response.uid).set({
              email: response.email,
              name: response.displayName,
              pic: response.photoURL,
            });
            this.navCtrl.push('AfterLoginPage', { data: response })
          });


      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  loginWithGooglePlus() {
    let that = this;
    this.googlePlus.login({
      'webClientId': webClientId,
      'offline': true
    })
      .then(res => {
        //logged in
        that.data = res;
        that.dataFb = null; //remove fb data

        const googleCredential = firebase.auth.GoogleAuthProvider
          .credential(res.idToken);

        firebase.auth().signInWithCredential(googleCredential)
          .then(response => {
            //alert("Firebase success: " + JSON.stringify(response));
            firebase.database().ref('/userProfile').child(response.uid).set({
              email: response.email,
              name: response.displayName,
              pic: response.photoURL,
            });
            this.navCtrl.push('AfterLoginPage', { data: response })

          });

      })
      .catch(err => {
        alert("There is an error " + JSON.stringify(err));
      });
  }

  logout() {
    let that = this;
    this.googlePlus.logout().then(() => {
      alert("Logged out");
      that.data = null;
    })
  }

  logoutFb() {
    let that = this;
    this.fbook.logout().then(() => {
      alert("Logged out");
      that.dataFb = null;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NativeLoginPage');
    if (!(<any>window).cordova) {
      // running on desktop browser
      this.hideSocialButtons = true;
    }
  }
}

