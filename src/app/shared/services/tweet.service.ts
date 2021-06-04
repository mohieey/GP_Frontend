import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AddTweetDTO } from '../_interfaces/addTweetDTO';
import { TweetDTO } from '../_interfaces/tweetDTO';
import { TweetWithRepliesDTO } from '../_interfaces/tweetWithRepliesDTO.model';

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


  getTweet(id: number): Observable<TweetWithRepliesDTO> {
    return this.httpClient.get<TweetWithRepliesDTO>(tweetApi + '/' + id);
  }

  uploadTweetImage(formData: FormData): Observable<any> {
    return this.httpClient.post(uploadApi + "/Image", formData).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

  uploadTweetVideo(formData: FormData): Observable<any> {
    return this.httpClient.post(uploadApi + "/Video", formData).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }

  addTweet(tweet: AddTweetDTO): Observable<any> {
    return this.httpClient.post<any>(tweetApi, tweet).pipe(catchError((err) => {
      return throwError(err.message || "Internal Server error contact site adminstarator");
    }));
  }
}
