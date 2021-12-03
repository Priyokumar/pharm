import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[suppliers]',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuppliersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
