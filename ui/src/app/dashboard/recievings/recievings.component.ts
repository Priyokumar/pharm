import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[recievings]',
  templateUrl: './recievings.component.html',
  styleUrls: ['./recievings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecievingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
