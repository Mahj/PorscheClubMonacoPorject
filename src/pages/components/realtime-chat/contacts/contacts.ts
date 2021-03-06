import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database-deprecated";
import { AngularFireAuth } from "angularfire2/auth";

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  contacts: any[];
  profile: any;
  uid: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(userAuth => {
      
      if(userAuth) {
        this.uid = userAuth.uid;     
        
        this.db.object('/userProfile/'+this.uid ).subscribe((profile) => {
          this.profile = profile;

          this.db.list('/userProfile/').subscribe((c) => {
            this.contacts = c;
            this.contacts = c.filter((x)=>{
                return x.email != profile.email;
            })
  
            
          })
        })

      } else {
          console.log('auth false');
          this.navCtrl.setRoot('LoginPage');
      }

    });
  }

  openChat(contact){
    this.navCtrl.push('ChatRoomPage', {userinfo: {from: this.profile, to: contact }});
  }

}
