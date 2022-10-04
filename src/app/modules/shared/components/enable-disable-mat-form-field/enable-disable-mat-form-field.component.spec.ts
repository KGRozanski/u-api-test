import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableDisableMatFormFieldComponent } from './enable-disable-mat-form-field.component';

describe('EnableDisableMatFormFieldComponent', () => {
  let component: EnableDisableMatFormFieldComponent;
  let fixture: ComponentFixture<EnableDisableMatFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableDisableMatFormFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableDisableMatFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
