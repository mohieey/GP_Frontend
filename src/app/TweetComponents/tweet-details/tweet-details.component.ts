import { TweetWithRepliesDTO } from './../../shared/_interfaces/tweetWithRepliesDTO.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from 'src/app/shared/services/tweet.service';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnInit {

  tweet: TweetWithRepliesDTO;
  id: number;
  constructor(private tweetService: TweetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['page'];
    this.tweetService.getTweet(this.id).subscribe(
      res => { this.tweet = res; console.log(this.tweet) },
      err => console.log(err));
  }

}
