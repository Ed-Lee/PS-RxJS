import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingWithObservableDataComponent } from './working-with-observable-data.component';

describe('WorkingWithObservableDataComponent', () => {
  let component: WorkingWithObservableDataComponent;
  let fixture: ComponentFixture<WorkingWithObservableDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingWithObservableDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingWithObservableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
