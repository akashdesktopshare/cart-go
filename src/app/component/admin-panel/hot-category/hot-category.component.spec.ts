import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotCategoryComponent } from './hot-category.component';

describe('HotCategoryComponent', () => {
  let component: HotCategoryComponent;
  let fixture: ComponentFixture<HotCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
