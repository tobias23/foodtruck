import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AbePage } from './abe';

@NgModule({
  declarations: [
    AbePage,
  ],
  imports: [
    IonicPageModule.forChild(AbePage),
  ],
})
export class AbePageModule {}
