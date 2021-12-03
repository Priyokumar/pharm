import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: '[medicines]',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicinesComponent implements OnInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.drawChart();
  }

  drawChart() {
    const myChart = new Chart('medicines-doghnut', {
      type: 'doughnut',
      data: {
        labels: ['Total', 'Expiring', 'Expired'],
        datasets: [
          {
            label: 'Medicines',
            data: [300, 50, 100],
            backgroundColor: [
              '#05a7c2',
              '#ffcc56',
              'rgb(255, 99, 132)',
            ],
            hoverOffset: 4,
            borderWidth:0
          },
        ],
      },
      options: {
        maintainAspectRatio:false,
        cutout:50,
        plugins:{
          legend:{
            labels:{
              pointStyle: 'rectRounded',
              usePointStyle: true,
              padding:25
            },
            position:'bottom',

          }
        },
        scales: {
          xAxis: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            display: false,
          },
          yAxis: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            display: false,
          },
        },
      },
    });
  }
}
