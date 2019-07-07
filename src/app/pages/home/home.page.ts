import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { StorageService, Item } from '../../services/storage.service';
import { ExtrasService } from '../../services/extras.service';
import { ConfigService } from '../../services/config.service';

import { ModalItemComponent } from '../modal-item/modal-item.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  items: Item[] = [];
  itemsShow: Item[] = [];
  itemsAllDays: any[] = [];
  itemsDays: any[] = [];
  dateSelected: number; // to check the month
  datepicker: string;

  monthBalance = 0;
  monthIncome = 0;
  monthExpense = 0;
  accountBalance = 0;

  storageWallet: string;
  storageCoin: string;
  storageAnual: boolean;

  constructor(
              private router: Router,
              private storageService: StorageService,
              private modalController: ModalController,
              public extrasService: ExtrasService,
              private configService: ConfigService
              ) {

    this.configService.load();
    this.storageWallet = this.configService.config.wallet;
    this.storageCoin = this.configService.config.coin;
    this.storageAnual = this.configService.config.anual;
  }

  ngOnInit() {
    this.loadItems();

    // initial setup
    let da = new Date();
    let year = da.getFullYear();
    let month = this.addZero(da.getMonth() + 1);

    this.datepicker = `${year}-${month}`;
    this.dateSelected = parseInt(`${year}${month}`);
  }

  add() {
    this.router.navigateByUrl(`/add`);
  }

  item() {
    this.router.navigateByUrl(`/item`);
  }

  show() {
    let pick = this.datepicker;
    let date = pick.toString();
    let dateNew = date.slice(0, 8);
    this.dateSelected = parseInt(dateNew.replace(/-/g, ''));

    this.loadItems();
  }

  addZero(n: number) { return n < 10 ? '0' + n : n; }

  public loadItems() {
    // inicializar variables
    this.itemsShow = [];
    this.monthBalance = 0;
    this.monthIncome = 0;
    this.monthExpense = 0;
    this.accountBalance = 0;

    this.storageService.getItems().then(items => {
      this.items = items;

      // order the array to show by date
      for (let i of this.items) {
        let date = i.date.toString();
        let checkDate = parseInt(date.slice(0,6));

        if (checkDate === this.dateSelected) {

          this.itemsShow.push(i);

          // total amounts of month
          if (i.amount > 0) {
            this.monthIncome += i.amount;
          } else {
            this.monthExpense -= i.amount;
          }

          this.monthBalance += i.amount;
        }

        this.accountBalance += i.amount;
      }
    });
  }

  async detailModal(item: Item) {
    const modal = await this.modalController.create({
      component: ModalItemComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        item
      }
    });

    modal.onDidDismiss()
      .then((data: any) => {
        if (data.data && data.data.removed) {
          this.loadItems();
        }
    });

    return await modal.present();
  }


  itemDetails(i: any) {
    this.router.navigate(['/item', JSON.stringify(i)]);
  }

  // // UPDATE
  // updateItem(item: Item) {
  //   item.title = `UPDATED: ${item.title}`;
  //   //item.modified = Date.now();

  //   this.storageService.updateItem(item).then(item => {
  //     //this.showToast('Item updated!');
  //     //this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
  //     this.loadItems(); // Or update it inside the array directly
  //   });
  // }
}
