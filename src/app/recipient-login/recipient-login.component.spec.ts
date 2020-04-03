import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientLoginComponent } from './recipient-login.component';

describe('RecipientLoginComponent', () => {
  let component: RecipientLoginComponent;
  let fixture: ComponentFixture<RecipientLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
