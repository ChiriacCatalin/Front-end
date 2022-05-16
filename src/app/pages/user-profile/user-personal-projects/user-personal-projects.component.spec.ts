import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPersonalProjectsComponent } from './user-personal-projects.component';

describe('UserPersonalProjectsComponent', () => {
  let component: UserPersonalProjectsComponent;
  let fixture: ComponentFixture<UserPersonalProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPersonalProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPersonalProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
