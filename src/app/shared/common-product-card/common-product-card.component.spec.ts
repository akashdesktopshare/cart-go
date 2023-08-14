import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonProductCardComponent } from './common-product-card.component';

describe('CommonProductCardComponent', () => {
  let component: CommonProductCardComponent;
  let fixture: ComponentFixture<CommonProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonProductCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
