import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
 
@IonicPage()
@Component({
  selector: 'page-cal-details',
  templateUrl: 'cal-details.html',
})
export class CalDetailsPage {
  calName = '';
  events = [];
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private calendar: Calendar, private plt: Platform) {
    this.calName = navParams.get('name');
    console.log(this.calName);
    
 
    if (this.plt.is('ios')) {
      this.calendar.findAllEventsInNamedCalendar(this.calName).then(data => {
        this.events = data;
        console.log('Here is the name of the calendar' + this.calName);
        console.log('' + this.events.length);
      });
    } else if (this.plt.is('android')) {
      let start = new Date();
      let end = new Date();
      end.setDate(end.getDate() + 31);
 
      this.calendar.listEventsInRange(start, end).then(data => {
        this.events = data;
      });
    }
  }
 
}