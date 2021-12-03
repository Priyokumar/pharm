import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Chart, ChartType,registerables } from 'chart.js';

@Component({
  selector: '[sales-timeline]',
  templateUrl: './sales-timeline.component.html',
  styleUrls: ['./sales-timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SalesTimelineComponent implements OnInit {
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.drawChart();
  }

  drawChart() {
    const labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Sales Timeline',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
    const type: ChartType = "line";
    const config = {
      type: type,
      data: data,
      
    };
    const myChart = new Chart('sales-timeline', {
      type:config.type, 
      data: config.data,
      options:{
        scales:{
          xAxis:{
            beginAtZero:true,grid:{}
          }
        }
      }
    });
  }
}
