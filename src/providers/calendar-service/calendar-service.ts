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

  constructor(private transfer: FileTransfer, private file: File) {
    console.log('Hello CalendarServiceProvider Provider');
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
