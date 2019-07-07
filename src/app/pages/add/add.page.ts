import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, Item } from '../../services/storage.service';

import { ModalController } from '@ionic/angular';
import { ModalCategoryComponent } from '../modal-category/modal-category.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  type: string;
  newItem: Item = {} as Item;
  selected: string;
  selectedCategory = 0;

  constructor( private router: Router,  private storageService: StorageService, private modalController: ModalController ) { }

  ngOnInit() {
    this.type = 'expense';
    this.selected = 'today';
    this.selectedCategory = 0;
  }

  changeType(type: string ) {
    this.type = type;
  }

  changeSelected( s: string ) {
    this.selected = s;
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  // CREATE
  addItem(amount: number, datetime: number ) {
    let fullDate;
    this.newItem.id = Date.now();
    this.newItem.category = this.selectedCategory;
    this.newItem.type = this.type;
    this.newItem.amount = (this.type === 'expense') ? (amount * -1) : (amount * 1);

    // patch if not selected date on 'other'
    if (this.selected === 'other' && !datetime) {
      this.selected = 'today';
    }

    if (this.selected === 'today') {
      let da = new Date();
      let year = da.getFullYear();
      let month = this.addZero(da.getMonth() + 1);
      let day = this.addZero(da.getDate());

      fullDate = `${year}${month}${day}`;
    } else {
      if (this.selected === 'yesterday') {
        // yesterday
        let da = new Date();
        da.setDate(da.getDate() - 1);
        let year = da.getFullYear();
        let month = this.addZero(da.getMonth() + 1);
        let day = this.addZero(da.getDate());

        fullDate = `${year}${month}${day}`;
      } else {
        // do something
        let date = datetime.toString();
        let dateNew = date.slice(0, 10);
        fullDate = dateNew.replace(/-/g, '');
      }
    }

    this.newItem.date = fullDate;

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = {} as Item;

      document.location.href = '/home';
    });
  }

  addZero(n: number) { return n < 10 ? '0' + n : n; }

  // Modal
  async detailModal() {
    let modal = await this.modalController.create({
      component: ModalCategoryComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        //item: item
      }
    });

    modal.onDidDismiss()
      .then((data: any) => {
        if (data.data && data.data.selected) {
          this.selectedCategory = data.data.selected;
        }
    });

    return await modal.present();
  }
}
