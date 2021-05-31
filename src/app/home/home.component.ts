import { TweetDTO } from './../shared/_interfaces/tweetDTO';
import { Component, OnInit } from '@angular/core';
import { TweetService } from '../shared/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePageTweets: TweetDTO[];
  currentUserId: string = '8af25f42-19ba-43f3-ba0f-f42588043e74';
  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    this.tweetService.getHomePageTweets(this.currentUserId).subscribe(res => { this.homePageTweets = res; console.log(res) })
  }

}
