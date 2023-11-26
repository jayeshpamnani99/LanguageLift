import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuizModuleComponent } from './view-quiz-module.component';

describe('ViewQuizModuleComponent', () => {
  let component: ViewQuizModuleComponent;
  let fixture: ComponentFixture<ViewQuizModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewQuizModuleComponent]
    });
    fixture = TestBed.createComponent(ViewQuizModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
