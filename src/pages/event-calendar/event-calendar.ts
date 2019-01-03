import { Push } from '@ionic-native/push';
import { Calendar } from '@ionic-native/calendar';
import { Platform } from 'ionic-angular';
//import { NgCalendarModule } from 'ionic2-calendar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventCalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-calendar',
  templateUrl: 'event-calendar.html',
})
export class EventCalendarPage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private plt: Platform, private mycalendar: Calendar) {
     if (this.plt.is('ios')) {
      this.mycalendar.findAllEventsInNamedCalendar('PCM').then(data => {
        // this.eventSource = data;
        data.forEach(item => {
          console.log(item["title"]);
          console.log(item[0]);
          console.log(item["title"]);
          console.log(item["title"]);
          this.eventSource.push({
            title: item[0],
            startTime: item[1],
            endTime: item[2],
            allday: false});
        });
        
      });
    } else if (this.plt.is('android')) {
      let start = new Date();
      let end = new Date();
      end.setDate(end.getDate() + 31);
 
      this.mycalendar.listEventsInRange(start, end).then(data => {
        this.eventSource = data;
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCalendarPage');
    console.log(this.eventSource);
  }

  addEvent(){}


  onViewTitleChanged(title){
    this.viewTitle = title;

  }

  onTimeSelected(ev){

  }

  onEventSelected(event){

  }

}
