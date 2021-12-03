import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[medicines]',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MedicinesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
