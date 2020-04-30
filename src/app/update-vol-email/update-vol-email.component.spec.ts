import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVolEmailComponent } from './update-vol-email.component';

describe('UpdateVolEmailComponent', () => {
  let component: UpdateVolEmailComponent;
  let fixture: ComponentFixture<UpdateVolEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateVolEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVolEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
