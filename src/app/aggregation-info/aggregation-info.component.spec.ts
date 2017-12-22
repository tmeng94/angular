import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregationInfoComponent } from './aggregation-info.component';

describe('AggregationInfoComponent', () => {
  let component: AggregationInfoComponent;
  let fixture: ComponentFixture<AggregationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AggregationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
