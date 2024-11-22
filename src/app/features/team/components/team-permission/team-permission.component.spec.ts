import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPermissionComponent } from './team-permission.component';

describe('TeamPermissionComponent', () => {
  let component: TeamPermissionComponent;
  let fixture: ComponentFixture<TeamPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
