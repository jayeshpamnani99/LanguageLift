
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QuizServiceService } from './quiz-service.service';
import { LocalStorageService } from '../local-storage.service';

describe('QuizServiceService', () => {
  let service: QuizServiceService;
  let httpTestingController: HttpTestingController;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        QuizServiceService,
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    });
    service = TestBed.inject(QuizServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit quiz details', () => {
    const submissionText = 'Some submission text';
    const moduleId = 1;
    const courseId = 1;

    service.submitQuizDetails(submissionText, moduleId, courseId).subscribe();

    const req = httpTestingController.expectOne(`${service.qmsUrl}/submitQuiz`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      courseId: courseId,
      moduleId: moduleId,
      submissionText: submissionText,
    });

    req.flush({});
  });

  it('should get quiz submissions for grading', () => {
    const moduleId = 1;
    const courseId = 1;

    service.getQuizSubmissionsForGrading(moduleId, courseId).subscribe();

    const req = httpTestingController.expectOne(
      `${service.qmsUrl}/getQuizSubmissionsForGrading?courseModuleId=${moduleId}&courseId=${courseId}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush({});
  });

  it('should post quiz marks', () => {
    const submissionId = 1;
    const marksObtained = 10;

    service.postQuizMarks(submissionId, marksObtained).subscribe();

    const req = httpTestingController.expectOne(
      `${service.qmsUrl}/postQuizMarks?submissionId=${submissionId}&marksObtained=${marksObtained}`
    );
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({});

    req.flush({});
  });

  it('should set Authorization header when getting HTTP options with token', () => {
    localStorageServiceSpy.get.and.returnValue('testToken');

    const httpOptions = service.getHttpOptionsWithToken();

    expect(httpOptions.headers.get('Authorization')).toEqual('testToken');
  });

  it('should set Authorization header and Content-Type when getting HTTP options with token and content type', () => {
    localStorageServiceSpy.get.and.returnValue('testToken');

    const httpOptions = service.getHttpOptionsWithTokenAndContentType();

    expect(httpOptions.headers.get('Authorization')).toEqual('testToken');
    expect(httpOptions.headers.get('Content-Type')).toEqual('application/json');
  });

  // it('should include valid token in Authorization header', () => {
  //   const validToken = 'validToken123';
  //   spyOn(localStorageService, 'get').and.returnValue(validToken);

  //   const result = service.getHttpOptionsWithToken();

  //   expect(result.headers.get('Authorization')).toBe(validToken);
  // });

  // it('should handle empty token by having an empty Authorization header', () => {
  //   spyOn(localStorageService, 'get').and.returnValue('');

  //   const result = service.getHttpOptionsWithToken();

  //   expect(result.headers.get('Authorization')).toBe('');
  // });

});

