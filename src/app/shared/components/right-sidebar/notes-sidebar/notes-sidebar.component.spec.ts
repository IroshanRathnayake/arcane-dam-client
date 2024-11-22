import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesSidebarComponent } from './notes-sidebar.component';

describe('NotesSidebarComponent', () => {
  let component: NotesSidebarComponent;
  let fixture: ComponentFixture<NotesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
