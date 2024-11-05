import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskboardComponent } from './taskboard.component';

describe('TaskboardComponent', () => {
  let component: TaskboardComponent;
  let fixture: ComponentFixture<TaskboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
