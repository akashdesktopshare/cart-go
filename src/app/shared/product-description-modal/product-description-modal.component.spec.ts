import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDescriptionModalComponent } from './product-description-modal.component';

describe('ProductDescriptionModalComponent', () => {
  let component: ProductDescriptionModalComponent;
  let fixture: ComponentFixture<ProductDescriptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDescriptionModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
