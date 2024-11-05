import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareAssetComponent } from './share-asset.component';

describe('ShareAssetComponent', () => {
  let component: ShareAssetComponent;
  let fixture: ComponentFixture<ShareAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareAssetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
