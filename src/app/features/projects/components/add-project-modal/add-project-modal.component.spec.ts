import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectModalComponent } from './add-project-modal.component';

describe('AddProjectModalComponent', () => {
  let component: AddProjectModalComponent;
  let fixture: ComponentFixture<AddProjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProjectModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
