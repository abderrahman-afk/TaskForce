import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectmembreComponent } from './selectmembre.component';

describe('SelectmembreComponent', () => {
  let component: SelectmembreComponent;
  let fixture: ComponentFixture<SelectmembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectmembreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectmembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
