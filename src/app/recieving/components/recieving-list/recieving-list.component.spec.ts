/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecievingListComponent } from './recieving-list.component';

describe('RecievingListComponent', () => {
  let component: RecievingListComponent;
  let fixture: ComponentFixture<RecievingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecievingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
