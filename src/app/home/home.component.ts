import { TweetDTO } from './../shared/_interfaces/tweetDTO';
import { Component, OnInit } from '@angular/core';
import { TweetService } from '../shared/services/tweet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePageTweets: TweetDTO[];
  constructor(private _tweetService: TweetService, private _router: Router) { }

  ngOnInit(): void {
    this._tweetService.getHomePageTweets().subscribe(res => { this.homePageTweets = res; console.log(res) })
  }

  search(event){
    this._router.navigate(['/search'], { queryParams: { key: event.target.value } })
  }
}
