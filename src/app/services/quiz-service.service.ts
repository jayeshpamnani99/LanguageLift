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

  public submitQuizDetails(submissionText:string,moduleId:number,courseId:number) {
    this.httpOptions = this.getHttpOptionsWithToken();
    return this.http.post(this.qmsUrl+'/submitQuiz', {courseId: courseId,
      moduleId: moduleId,
      submissionText: submissionText}, this.httpOptions );
  }

}
