import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingWithObservablesComponent } from './working-with-observables.component';

describe('WorkingWithObservablesComponent', () => {
  let component: WorkingWithObservablesComponent;
  let fixture: ComponentFixture<WorkingWithObservablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingWithObservablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingWithObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
