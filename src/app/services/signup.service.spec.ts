import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupService } from './signup.service';

describe('SignupService', () => {
  let service: SignupService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupService],
    });
    service = TestBed.inject(SignupService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a signup request', () => {
    const testData = { username: 'testuser', password: 'testpassword' };
    service.signup(testData).subscribe();

    const req = httpTestingController.expectOne(`${service.umsUrl}/signup`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    req.flush({});
  });

  it('should send a login request', () => {
    const testData = { username: 'testuser', password: 'testpassword' };
    service.login(testData).subscribe();

    const req = httpTestingController.expectOne(`${service.umsUrl}/login`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(testData);

    req.flush({});
  });

  it('should send a loginUser request', () => {
    const userLoginCred = ['testuser', 'testpassword'];
    service.loginUser(userLoginCred).subscribe();

    const req = httpTestingController.expectOne(`${service.umsUrl}/loginUser/`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ username: 'testuser', password: 'testpassword' });

    req.flush({});
  });
});
