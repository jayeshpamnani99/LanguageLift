import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorQuizViewComponent } from './instructor-quiz-view.component';

describe('InstructorQuizViewComponent', () => {
  let component: InstructorQuizViewComponent;
  let fixture: ComponentFixture<InstructorQuizViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorQuizViewComponent]
    });
    fixture = TestBed.createComponent(InstructorQuizViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
