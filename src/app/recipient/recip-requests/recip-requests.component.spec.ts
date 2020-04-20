import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipRequestsComponent } from './recip-requests.component';

describe('RecipRequestsComponent', () => {
  let component: RecipRequestsComponent;
  let fixture: ComponentFixture<RecipRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
