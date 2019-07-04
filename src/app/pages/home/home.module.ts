import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
// Pipes
import { FixdatePipe } from '../../pipes/fixdate.pipe';
import { IconurlPipe } from '../../pipes/iconurl.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, FixdatePipe, IconurlPipe]
})
export class HomePageModule {}
