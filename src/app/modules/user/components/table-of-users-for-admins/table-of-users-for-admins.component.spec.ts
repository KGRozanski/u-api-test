import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfUsersForAdminsComponent } from './table-of-users-for-admins.component';

describe('TableOfUsersForAdminsComponent', () => {
  let component: TableOfUsersForAdminsComponent;
  let fixture: ComponentFixture<TableOfUsersForAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOfUsersForAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOfUsersForAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
