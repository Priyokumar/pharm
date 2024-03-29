/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SaleAddComponent } from './sale-add.component';

describe('SaleAddComponent', () => {
  let component: SaleAddComponent;
  let fixture: ComponentFixture<SaleAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
