import { Component, OnInit } from '@angular/core';
import { TweetService } from '../shared/services/tweet.service';
import { TweetDTO } from '../shared/_interfaces/tweetDTO';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  tweets: TweetDTO[] = [];

  constructor(private _tweetService: TweetService) { }

  ngOnInit(): void {
    this._tweetService.getHomePageTweets().subscribe((res) => {
      this.tweets = res;
      console.log(res);
    });
  }

}
