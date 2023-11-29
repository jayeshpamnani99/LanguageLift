import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ViewCourseModuleComponent } from './view-course-module.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import for MatDialogModule
import { of } from 'rxjs';

describe('ViewCourseModuleComponent', () => {
  let component: ViewCourseModuleComponent;
  let fixture: ComponentFixture<ViewCourseModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCourseModuleComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule, // Import MatDialogModule
        BrowserAnimationsModule, // Import for MatDialogModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => '1', // Adjust to match your route parameter value
              },
            },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(ViewCourseModuleComponent);
    component = fixture.componentInstance;
  });


  it('should display the course content iframe', fakeAsync(() => {
    
    spyOn((component as any).courseService, 'getModuleDetailsFull').and.returnValue(of({
      id: 1, // Ensure 'id' property is available in the returned object
      title: 'Test Module',
      description: 'This is a test module',
      serialNumber: 1,
    }));

    // ...
  }));


  // it('should display the module title', fakeAsync(() => {
  //   fixture.detectChanges();
  //   tick();
  //   const titleElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('h1');
  //   expect(titleElement.textContent).toContain('Test Module');
  // }));

  // it('should display the module description', () => {
  //   const descriptionElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('li strong:nth-child(1)');
  //   expect(descriptionElement.textContent).toContain('Description:');
  //   expect(descriptionElement.textContent).toContain('This is a test module');
  // });

  // it('should display the module week number', () => {
  //   const weekNumberElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('li strong:nth-child(2)');
  //   expect(weekNumberElement.textContent).toContain('Week Number:');
  //   expect(weekNumberElement.textContent).toContain('1');
  // });

  // it('should display the module serial number', () => {
  //   const serialNumberElement: HTMLElement = fixture.debugElement.nativeElement.querySelector('li strong:nth-child(3)');
  //   expect(serialNumberElement.textContent).toContain('Serial Number:');
  //   expect(serialNumberElement.textContent).toContain('1');
  // });

  

  
});
