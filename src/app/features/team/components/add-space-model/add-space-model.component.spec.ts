import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpaceModelComponent } from './add-space-model.component';

describe('AddSpaceModelComponent', () => {
  let component: AddSpaceModelComponent;
  let fixture: ComponentFixture<AddSpaceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSpaceModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSpaceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
