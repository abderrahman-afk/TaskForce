import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignTaskComponent } from './dialog-assign-task.component';

describe('DialogAssignTaskComponent', () => {
  let component: DialogAssignTaskComponent;
  let fixture: ComponentFixture<DialogAssignTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAssignTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAssignTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
