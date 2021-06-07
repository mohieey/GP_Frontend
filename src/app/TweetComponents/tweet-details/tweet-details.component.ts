import { TweetWithRepliesDTO } from './../../shared/_interfaces/tweetWithRepliesDTO.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from 'src/app/shared/services/tweet.service';
import { environment } from 'src/environments/environment';

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
      res => { this.tweet = res; console.log(res) },
      err => console.log(err));
      
  }

  public createImgPath = (serverPath: string) => {

    return `${environment.apiUrl}/${serverPath}`;

  }
}

