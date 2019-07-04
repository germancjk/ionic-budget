import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

import { StorageService, Item } from 'src/app/services/storage.service';
import { ExtrasService } from '../../services/extras.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {

  items: Item[] = [];
  statsContent: any[] = [];
  dateSelected: number; // to check the month
  datepicker: string;
  // charts
  chartLables: Label[] = [];
  chartData: number[] = [];

  // Doughnut
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    }
  };

  public doughnutChartLabels: Label[] = this.chartLables;
  public doughnutChartData: number[] = this.chartData;
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
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

    this.storageService.getItems().then(items => {
      this.items = items;

      // order the array to show by date
      for (let i of this.items) {
        let date = i.date.toString();
        let checkDate = parseInt(date.slice(0,6));
        // paso monto a positivo porque es una gráfica
        let amount = (i.amount < 0) ? i.amount * -1 : i.amount;

        if (checkDate === this.dateSelected) {

          let obj = this.statsContent.find((o, index) => {

            if (o.categoryID === i.category) {
              this.statsContent[index].amount += amount;
              return true; // stop searching
            }
          });

          if (!obj) {
            this.statsContent.push({categoryID: i.category, amount: amount});
          }
        }
      }

      // complete stats
      for (let ii of this.statsContent) {
        this.chartLables.push(this.extrasService.name(ii.categoryID));
        this.chartData.push(parseInt(ii.amount));
      }
      this.chartLables.toString();
      console.log('doughnutChartData', this.doughnutChartData);
      console.log('this.chartData', this.chartData);
    });
  }

  ngOnInit() {
    // initial setup
    let da = new Date();
    let year = da.getFullYear();
    let month = this.addZero(da.getMonth() + 1);

    this.datepicker = `${year}-${month}`;
    this.dateSelected = parseInt(`${year}${month}`);
  }

  addZero(n: number) { return n < 10 ? '0' + n : n; }

}
