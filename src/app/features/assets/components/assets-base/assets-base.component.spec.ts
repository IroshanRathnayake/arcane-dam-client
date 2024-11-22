import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsBaseComponent } from './assets-base.component';

describe('AssetsBaseComponent', () => {
  let component: AssetsBaseComponent;
  let fixture: ComponentFixture<AssetsBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
