import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnmeldelserPage } from './anmeldelser';

@NgModule({
  declarations: [
    AnmeldelserPage,
  ],
  imports: [
    IonicPageModule.forChild(AnmeldelserPage),
  ],
})
export class AnmeldelserPageModule {}
