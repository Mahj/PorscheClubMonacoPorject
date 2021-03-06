//import { EventCalendarPage } from './../pages/event-calendar/event-calendar';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//*********** ionic Native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Network } from '@ionic-native/network';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { AdMobFree } from '@ionic-native/admob-free';

import { MyApp } from './app.component';
import { CallNumber } from '@ionic-native/call-number';
import { SMS } from '@ionic-native/sms';
import { Calendar } from '@ionic-native/calendar';
import { HttpModule } from '@angular/http';

//***********  Angularfire2 v4 **************/

import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule} from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';

//*********** Provider **************/
import { AuthData } from '../providers/auth-data';
import { AuthService } from '../providers/auth-pwa/auth.service';
import { AdmobProvider } from '../providers/admob/admob';
import { config } from '../config/config';


//*********** Image Gallery **************/
import { GalleryModal } from 'ionic-gallery-modal';
import { ZoomableImage } from 'ionic-gallery-modal';


//*********** Image Gallery **************/
import { SocialSharing } from '@ionic-native/social-sharing';


//*********** App Rate **************/
import { RateServiceProvider } from '../providers/rate-service/rate-service';
import { AppRate } from '@ionic-native/app-rate';
import { DatabaseProvider } from '../providers/database/database';


import { AndroidPermissions } from '@ionic-native/android-permissions';
import { PayPal } from '@ionic-native/paypal';
import { Push } from '@ionic-native/push';

import { Clipboard } from '@ionic-native/clipboard';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';

import { Stripe } from '@ionic-native/stripe';

//import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { CalendarServiceProvider } from '../providers/calendar-service/calendar-service';
import { NgCalendarModule } from "ionic2-calendar";

@NgModule({
  declarations: [
    MyApp,
    GalleryModal,
      ZoomableImage,
     // ExposeSlideItemDirective
  ],
  imports: [
      BrowserModule,
      HttpModule,
    IonicModule.forRoot(MyApp),
    NgCalendarModule,

    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
      AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GalleryModal,
    ZoomableImage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
      AuthData,
      AuthService,
    Network,
    GooglePlus,
    Facebook,
    AdmobProvider,
    AdMobFree,
    SocialSharing,
      RateServiceProvider,
      AppRate,
      CallNumber,
      SMS,
      Calendar,
      DatabaseProvider,
      AndroidPermissions,
      PayPal,
      Stripe,
      Push,
      Clipboard,
      Toast,
      Camera,
      //FileTransfer, FileUploadOptions, FileTransferObject,
      File,
    CalendarServiceProvider,

  ]
})
export class AppModule {}
