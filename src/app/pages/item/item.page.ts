import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../../services/storage.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  item: Item[];

  id: number;
  type: string;
  amount: number;
  date: string;
  title: string;
  category: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.item = JSON.parse(this.activatedRoute.snapshot.params.item);

    this.type = (this.item['type']==='expense') ? 'Gasto' : 'Ingreso';
    this.amount = (this.item['amount']<0) ? this.item['amount']*-1: this.item['amount'];
    this.title = this.item['title'];
    this.id = this.item['id'];
    this.category = this.item['category'];

    let d = this.item['date'].slice(6, 8);
    let m = this.item['date'].slice(4, 6);
    let y = this.item['date'].slice(0, 4);
    this.date = `${d}/${m}/${y}`;
  }

  ngOnInit() {
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

}
