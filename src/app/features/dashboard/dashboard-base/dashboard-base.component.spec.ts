import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBaseComponent } from './dashboard-base.component';

describe('DashboardBaseComponent', () => {
  let component: DashboardBaseComponent;
  let fixture: ComponentFixture<DashboardBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
