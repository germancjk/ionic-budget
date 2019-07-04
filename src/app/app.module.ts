import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';
import { ChartsModule } from 'ng2-charts';

import { ModalItemComponent } from './pages/modal-item/modal-item.component';
import { ModalCategoryComponent } from './pages/modal-category/modal-category.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalItemComponent,
    ModalCategoryComponent
  ],
  entryComponents: [
    ModalItemComponent,
    ModalCategoryComponent
],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ChartsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
