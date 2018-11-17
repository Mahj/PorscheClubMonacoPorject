//import { CalendarServiceProvider } from './../../providers/calendar-service/calendar-service';
import { Push } from "@ionic-native/push";
import { Platform } from "ionic-angular";
import { Calendar } from "@ionic-native/calendar";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
//import { CalendarServiceProvider } from '../../providers/calendar-service';

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
    private plt: Platform,
    //private calData: CalendarServiceProvider
  ) {
    this.plt.ready().then(() => {
      /* calendars = this.calendar.listCalendars().then(
        msg => {
          console.log(msg);
        },
        err => {
          console.log(err);
        }
      ); */
      //this.calData.download();
      this.calendar.listCalendars().then(data => {
        this.calendars = data;
      });
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CalendarPage");
  }

  addEvent(cal) {
    let date = new Date();
    let options = {
      calendarId: cal.id,
      
      calendarName: cal.name,
      url: "https://ionicacademy.com",
      firstReminderMinutes: 15
    };

    this.calendar
      .createEventInteractivelyWithOptions(
        "My new Event",
        "Münster",
        "Special Notes",
        date,
        date,
        options
      )
      .then(
        res => {},
        err => {
          console.log("err: ", err);
        }
      );
  }

  openCal(cal) {
    this.navCtrl.push("CalDetailsPage", { name: cal.name });
  }
}
