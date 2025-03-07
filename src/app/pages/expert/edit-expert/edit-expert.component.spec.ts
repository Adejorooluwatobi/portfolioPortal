import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpertComponent } from './edit-expert.component';

describe('EditExpertComponent', () => {
  let component: EditExpertComponent;
  let fixture: ComponentFixture<EditExpertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExpertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
