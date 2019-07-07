import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import { StorageService, Item } from '../../services/storage.service';
import { ExtrasService } from '../../services/extras.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  items: Item[] = [];
  dateSelected: number; // to check the month
  dateSelectedAnual: number; // to check the month
  datepicker: string;
  // charts monthly
  statsContent: any[] = [];
  chartLables: Label[] = [];
  chartData: number[] = [];
  showStats = false;
  // charts anual
  statsContentAnual: any[] = [];
  chartLablesAnual: Label[] = [];
  chartDataAnual: number[] = [];
  showStatsAnual = false;

  // Doughnut
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    }
  };

  // monthly
  public doughnutChartLabels: Label[];
  public doughnutChartData: number[];
  // anual
  public doughnutChartLabelsAnual: Label[];
  public doughnutChartDataAnual: number[];

  public doughnutChartType: ChartType = 'doughnut';

  constructor(
              private router: Router,
              private storageService: StorageService,
              public extrasService: ExtrasService
            ) {
    this.loadStats();
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public loadStats() {

    // Monthly
    this.statsContent = [];
    this.chartLables = [];
    this.chartData = [];
    // Anual
    this.statsContentAnual = [];
    this.chartLablesAnual = [];
    this.chartDataAnual = [];

    this.storageService.getItems().then(items => {
      this.items = items;

      // order the array to show by date
      for (let i of this.items) {
        let date = i.date.toString();
        let checkDate = parseInt(date.slice(0,6));
        let checkDateAnual = parseInt(date.slice(0,4));
        // paso monto a positivo porque es una gráfica
        let amount = (i.amount < 0) ? i.amount * -1 : i.amount;

        // Monthly
        if (checkDate === this.dateSelected) {

          let obj = this.statsContent.find((o, index) => {

            if (o.categoryID === i.category) {
              this.statsContent[index].amount += amount;
              return true; // stop searching
            }
          });

          if (!obj) {
            this.statsContent.push({categoryID: i.category, amount});
          }
        }
        // Anual
        if (checkDateAnual === this.dateSelectedAnual) {
          let obj = this.statsContentAnual.find((o, index) => {

            if (o.categoryID === i.category) {
              this.statsContentAnual[index].amount += amount;
              return true; // stop searching
            }
          });

          if (!obj) {
            this.statsContentAnual.push({categoryID: i.category, amount});
          }
        }
      }

      // complete stats monthly
      for (let ii of this.statsContent) {
        this.chartLables.push(this.extrasService.name(ii.categoryID));
        this.chartData.push(parseInt(ii.amount));
      }
      this.chartLables.toString();

      this.doughnutChartLabels = this.chartLables;
      this.doughnutChartData = this.chartData;
      this.showStats = true;

      // complete stats anual
      for (let ii of this.statsContentAnual) {
        this.chartLablesAnual.push(this.extrasService.name(ii.categoryID));
        this.chartDataAnual.push(parseInt(ii.amount));
      }
      this.chartLablesAnual.toString();

      this.doughnutChartLabelsAnual = this.chartLablesAnual;
      this.doughnutChartDataAnual = this.chartDataAnual;
      this.showStatsAnual = true;
    });
  }

  ngOnInit() {
    // initial setup
    let da = new Date();
    let year = da.getFullYear();
    let month = this.addZero(da.getMonth() + 1);

    this.datepicker = `${year}-${month}`;
    this.dateSelected = parseInt(`${year}${month}`);
    this.dateSelectedAnual = year;
  }

  show() {
    let pick = this.datepicker;
    let date = pick.toString();
    let dateNew = date.slice(0, 8);
    this.dateSelected = parseInt(dateNew.replace(/-/g, ''));
    this.dateSelectedAnual = parseInt(date.slice(0, 4));

    this.loadStats();
  }

  goHome() {
    this.router.navigateByUrl('/home');
  }

  addZero(n: number) { return n < 10 ? '0' + n : n; }

}
