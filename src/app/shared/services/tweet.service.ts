import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TweetDTO } from '../_interfaces/tweetDTO';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  tweetApi = environment.apiUrl+"/api/Tweets";

  constructor(private httpClient:HttpClient) { }

  homePageTweets(id:string):Observable<TweetDTO[]> {
    return this.httpClient.get<TweetDTO[]>(this.tweetApi+"/HomePageTweets/"+id)
  }
}
