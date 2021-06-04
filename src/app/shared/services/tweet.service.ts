import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TweetDTO } from '../_interfaces/tweetDTO';

const tweetApi = environment.apiUrl + "/api/Tweets";
const uploadApi = environment.apiUrl + "/api/Upload"
@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private httpClient: HttpClient) { }

  getHomePageTweets(): Observable<TweetDTO[]> {
    return this.httpClient.get<TweetDTO[]>(tweetApi + "/HomePageTweets").pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

  uploadProductImage(formData: FormData): Observable<any> {
    return this.httpClient.post(uploadApi + "/Image", formData).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

  getTweet(id: number): Observable<TweetDTO> {
    return this.httpClient.get<TweetDTO>(tweetApi + '/' + id);
  }

  getTweetReplies(id: number): Observable<TweetDTO> {
    return this.httpClient.get<TweetDTO>(tweetApi + '/TweetReplies/' + id);
  }
}
