import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolRequestsComponent } from './vol-requests.component';

describe('VolRequestsComponent', () => {
  let component: VolRequestsComponent;
  let fixture: ComponentFixture<VolRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
