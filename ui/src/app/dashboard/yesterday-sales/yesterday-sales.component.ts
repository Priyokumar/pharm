import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[yesterday-sales]',
  templateUrl: './yesterday-sales.component.html',
  styleUrls: ['./yesterday-sales.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YesterdaySalesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
