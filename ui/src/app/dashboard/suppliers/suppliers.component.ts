import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: '[suppliers]',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuppliersComponent implements OnInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.drawChart();
  }

  drawChart() {
    const myChart = new Chart('suppliers-doghnut', {
      type: 'doughnut',
      data: {
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            label: 'Suppliers',
            data: [300, 50],
            backgroundColor: ['#05a7c2','#ffcc56'],
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
            position:'bottom'
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
