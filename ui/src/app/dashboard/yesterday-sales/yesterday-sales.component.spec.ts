import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesterdaySalesComponent } from './yesterday-sales.component';

describe('YesterdaySalesComponent', () => {
  let component: YesterdaySalesComponent;
  let fixture: ComponentFixture<YesterdaySalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesterdaySalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YesterdaySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
