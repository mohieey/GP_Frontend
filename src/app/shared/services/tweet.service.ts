import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TweetDTO } from '../_interfaces/tweetDTO';

const tweetApi = environment.apiUrl + "/api/Tweets";
@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private httpClient: HttpClient) { }

  getHomePageTweets(id: string): Observable<TweetDTO[]> {
    return this.httpClient.get<TweetDTO[]>(tweetApi + "/HomePageTweets/" + id)
  }
}
