import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: '[today-sales]',
  templateUrl: './today-sales.component.html',
  styleUrls: ['./today-sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodaySalesComponent implements OnInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.drawChart();
  }

  drawChart() {
    const myChart = new Chart('today-sales-doghnut', {
      type: 'doughnut',
      data: {
        labels: ['Today', 'Yesterday'],
        datasets: [
          {
            label: 'Recent Sales',
            data: [300, 50],
            backgroundColor: ['#22a399', '#e1e90b'],
            hoverOffset: 4,
            borderWidth: 0,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        cutout: 50,
        plugins: {
          legend: {
            labels: {
              pointStyle: 'rectRounded',
              usePointStyle: true,
              padding: 25,
            },
            position: 'bottom',
          },
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
