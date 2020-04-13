import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecippwComponent } from './edit-recippw.component';

describe('EditRecippwComponent', () => {
  let component: EditRecippwComponent;
  let fixture: ComponentFixture<EditRecippwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecippwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecippwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
