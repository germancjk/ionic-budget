import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExtrasService } from '../../services/extras.service';

@Component({
  selector: 'app-modal-category',
  templateUrl: './modal-category.component.html',
  styleUrls: ['./modal-category.component.scss'],
})
export class ModalCategoryComponent implements OnInit {

  categories: {} = {};

  constructor( public extrasService: ExtrasService, public modalController: ModalController ) {
    this.categories = this.extrasService.categories;
  }

  ngOnInit() {}

  selectedCategory(id: number) {
    this.modalController.dismiss({
      selected: id
    });
  }

}
