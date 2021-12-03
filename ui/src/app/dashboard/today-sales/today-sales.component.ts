import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[today-sales]',
  templateUrl: './today-sales.component.html',
  styleUrls: ['./today-sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodaySalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
