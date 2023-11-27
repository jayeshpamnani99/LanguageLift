import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuizServiceService {

  constructor(private http:HttpClient,private localStorageService:LocalStorageService) { }

  private httpOptions :any;
  qmsUrl = `${environment.apiBaseUrl}${environment.qmsPort}`;

  getHttpOptionsWithToken() {
    return {headers: new HttpHeaders({
      'Authorization': this.localStorageService.get('token')
    })}
  }
  getHttpOptionsWithTokenAndContentType() {
    return {headers: new HttpHeaders({
      'Authorization': this.localStorageService.get('token'),
      'Content-Type': 'application/json'
    })}
  }

  public submitQuizDetails(submissionText:string,moduleId:number,courseId:number) {
    this.httpOptions = this.getHttpOptionsWithToken();
    return this.http.post(this.qmsUrl+'/submitQuiz', {courseId: courseId,
      moduleId: moduleId,
      submissionText: submissionText}, this.httpOptions );
  }

  public getQuizSubmissionsForGrading(moduleId:number,courseId:number) {
    this.httpOptions = this.getHttpOptionsWithToken();
    return this.http.get(this.qmsUrl+'/getQuizSubmissionsForGrading?courseModuleId='+moduleId+'&courseId='+courseId, this.httpOptions );
  }

  public postQuizMarks(submissionId:number,marksObtained:number){
    this.httpOptions = this.getHttpOptionsWithTokenAndContentType();
    return this.http.post(this.qmsUrl+'/postQuizMarks?submissionId='+submissionId+'&marksObtained='+marksObtained, {},this.httpOptions );

  }

}
