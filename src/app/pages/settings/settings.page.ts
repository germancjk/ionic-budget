import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private router: Router,
    public configService: ConfigService
  ) {
    this.configService.load();
  }

  ngOnInit() {
  }

  change(reload=false) {
    this.configService.save();
    if (reload) {
      window.location.href = 'settings';
    }
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

}
