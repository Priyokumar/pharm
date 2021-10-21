/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecievingItemAddRditComponent } from './recieving-item-add-rdit.component';

describe('RecievingItemAddRditComponent', () => {
  let component: RecievingItemAddRditComponent;
  let fixture: ComponentFixture<RecievingItemAddRditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievingItemAddRditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievingItemAddRditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
