import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideChartsComponent } from './side-charts.component';

describe('SideChartsComponent', () => {
  let component: SideChartsComponent;
  let fixture: ComponentFixture<SideChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
