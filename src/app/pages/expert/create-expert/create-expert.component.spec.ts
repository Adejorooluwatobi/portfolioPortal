import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpertComponent } from './create-expert.component';

describe('CreateExpertComponent', () => {
  let component: CreateExpertComponent;
  let fixture: ComponentFixture<CreateExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateExpertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
