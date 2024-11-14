import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBasedTaskComponent } from './user-based-task.component';

describe('UserBasedTaskComponent', () => {
  let component: UserBasedTaskComponent;
  let fixture: ComponentFixture<UserBasedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserBasedTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBasedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
