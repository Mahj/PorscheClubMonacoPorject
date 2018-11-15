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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventCalendarPage');
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
