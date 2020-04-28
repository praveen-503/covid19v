import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiaSvgComponent } from './india-svg.component';

describe('IndiaSvgComponent', () => {
  let component: IndiaSvgComponent;
  let fixture: ComponentFixture<IndiaSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiaSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiaSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
