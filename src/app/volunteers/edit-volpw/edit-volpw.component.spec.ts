import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVolpwComponent } from './edit-volpw.component';

describe('EditVolpwComponent', () => {
  let component: EditVolpwComponent;
  let fixture: ComponentFixture<EditVolpwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVolpwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVolpwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
