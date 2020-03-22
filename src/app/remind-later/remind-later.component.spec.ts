import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindLaterComponent } from './remind-later.component';

describe('RemindLaterComponent', () => {
  let component: RemindLaterComponent;
  let fixture: ComponentFixture<RemindLaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemindLaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
