import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseModuleComponent } from './view-course-module.component';

describe('ViewCourseModuleComponent', () => {
  let component: ViewCourseModuleComponent;
  let fixture: ComponentFixture<ViewCourseModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCourseModuleComponent]
    });
    fixture = TestBed.createComponent(ViewCourseModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
