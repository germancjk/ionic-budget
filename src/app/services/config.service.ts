import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config: Config;

  constructor() { }

  save() {
    localStorage.setItem('config-budget', JSON.stringify(this.config));
  }

  load() {
    if (localStorage.getItem('config-budget')) {
      this.config = JSON.parse(localStorage.getItem('config-budget'));
    } else {
      this.config = { wallet: 'Wallet', lang: 'es', coin: 'U$D', anual: true };
      this.save();
    }
  }
}
