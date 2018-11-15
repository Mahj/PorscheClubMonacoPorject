import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoGaleryPage } from './photo-galery';

@NgModule({
  declarations: [
    PhotoGaleryPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoGaleryPage),
  ],
})
export class PhotoGaleryPageModule {}
