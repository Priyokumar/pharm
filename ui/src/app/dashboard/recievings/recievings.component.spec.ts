import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievingsComponent } from './recievings.component';

describe('RecievingsComponent', () => {
  let component: RecievingsComponent;
  let fixture: ComponentFixture<RecievingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecievingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecievingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
