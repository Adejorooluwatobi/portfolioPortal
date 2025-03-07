import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestimonialComponent } from './create-testimonial.component';

describe('CreateTestimonialComponent', () => {
  let component: CreateTestimonialComponent;
  let fixture: ComponentFixture<CreateTestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTestimonialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTestimonialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
