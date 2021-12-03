import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: '[recievings]',
  templateUrl: './recievings.component.html',
  styleUrls: ['./recievings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecievingsComponent implements OnInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.drawChart();
  }

  drawChart() {
    const myChart = new Chart('recievings-timeline', {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Recievings Timeline',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            borderColor: '#05beda70',
            tension: 0.4,
            borderWidth: 1,
            pointRadius: 2,
            backgroundColor: '#05beda27',
            pointHoverBorderColor: '#05bedaf6',
          },
        ],
      },
      options: {
        plugins:{
          legend:{
            display: false,
          },
        },
        scales: {
          xAxis: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
          yAxis: {
            beginAtZero: true,
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}
