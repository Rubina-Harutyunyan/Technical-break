import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeModalComponent } from './time-modal.component';

describe('TimeModalComponent', () => {
  let component: TimeModalComponent;
  let fixture: ComponentFixture<TimeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
