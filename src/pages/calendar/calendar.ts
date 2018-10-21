import { Push } from '@ionic-native/push';
import { Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CalendarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-calendar",
  templateUrl: "calendar.html"
})
export class CalendarPage {
  calendars = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private calendar: Calendar,
    private plt: Platform
  ) {
    this.plt.ready().then(() => {
      this.calendar.listCalendars().then(data => {
        this.calendar = data;
      });
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CalendarPage");
  }

  addEvent(cal) {
    let date = new Date();
    let options = {calendarId: cal.id, calendarName: cal.name, url: 'http://porscheclubmonaco.mc', firstReminderMinutes: 15};
    this.calendar.createEventInteractivelyWithOptions('My Event','Monaco','Some notes', date, date, options).then(res => {
    }, err => {
      console.log('err: ', err);
    });

  }

  openCalendar(cal) {
    this.navCtrl.push("CalDetailsPage", { name: cal.name });
  }
}
