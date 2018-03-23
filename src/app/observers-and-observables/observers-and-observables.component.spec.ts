import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserversAndObservablesComponent } from './observers-and-observables.component';

describe('ObserversAndObservablesComponent', () => {
  let component: ObserversAndObservablesComponent;
  let fixture: ComponentFixture<ObserversAndObservablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObserversAndObservablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserversAndObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
