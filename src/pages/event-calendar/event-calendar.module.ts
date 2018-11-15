import { NgCalendarModule } from 'ionic2-calendar';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventCalendarPage } from './event-calendar';

@NgModule({
  declarations: [
    EventCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(EventCalendarPage),
    NgCalendarModule
  ],
})
export class EventCalendarPageModule {}
