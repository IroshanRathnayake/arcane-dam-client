import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarksSidebarComponent } from './bookmarks-sidebar.component';

describe('BookmarksSidebarComponent', () => {
  let component: BookmarksSidebarComponent;
  let fixture: ComponentFixture<BookmarksSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarksSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarksSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
