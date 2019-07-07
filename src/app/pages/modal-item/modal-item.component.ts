import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController, ModalController } from '@ionic/angular';

import { StorageService, Item } from '../../services/storage.service';
import { ExtrasService } from '../../services/extras.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss'],
})
export class ModalItemComponent implements OnInit {

  item: Item;

  constructor(
        private navParams: NavParams,
        private storageService: StorageService,
        public alertController: AlertController,
        public modalController: ModalController,
        public extrasService: ExtrasService,
        public configService: ConfigService
      )  {

    this.item = navParams.get('item');
  }

  ngOnInit() {}

  async itemAlertDelete(t: string) {
    // Lang
    let lang = this.configService.config.lang;
    let header = (lang=='es') ? 'Eliminar' : 'Delete';
    let message = (lang=='es') ? 'Desea eliminar: <strong>' + t + '</strong>?' : 'Do you want to delete: <strong>' + t + '</strong>?';
    let cancel = (lang=='es') ? 'Cancelar' : 'Cancel';

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: header,
          handler: () => {
            // console.log('Confirm Okay');
            this.deleteItem(this.item);
            //this.homePage.loadItems();
            this.closeModal();
          }
        }
      ]
    });

    await alert.present();
  }

  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then(item => {
      // removed
    });
    this.modalController.dismiss({
      removed: true
    });
  }

  closeModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      removed: false
    });
  }
}
