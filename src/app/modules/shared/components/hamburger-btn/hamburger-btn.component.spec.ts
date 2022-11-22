import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerBtnComponent } from './hamburger-btn.component';

describe('HamburgerBtnComponent', () => {
  let component: HamburgerBtnComponent;
  let fixture: ComponentFixture<HamburgerBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HamburgerBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HamburgerBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
