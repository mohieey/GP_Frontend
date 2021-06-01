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
  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    this.tweetService.getHomePageTweets().subscribe(res => { this.homePageTweets = res; console.log(res) })
  }

}
