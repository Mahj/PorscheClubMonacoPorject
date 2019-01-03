import { Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/*
  Generated class for the CalendarServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalendarServiceProvider {

  events = [];

  constructor(private transfer: FileTransfer, private file: File, private calendar: Calendar, private plt: Platform) {
    console.log('Hello CalendarServiceProvider Provider');
    if (this.plt.is('ios')) {
      this.calendar.findAllEventsInNamedCalendar('PCM').then(data => {
        this.events = data;
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
    fileTransfer: FileTransferObject = this.transfer.create();
  download() {
  const url = 'https://www.monaco-porscheclub.fr/PorscheClubs/pc_monaco/pc_main.nsf/webeventsicalendar.ics?OpenView&eventslist=220327EE0A5704F6C1257EEA004987B2&year=2018';
  this.fileTransfer.download(url, this.file.dataDirectory + 'webeventsicalendar.ics').then((entry) => {
    console.log('download complete: ' + entry.toURL());
  }, (error) => {
    // handle error
  });
  }



}