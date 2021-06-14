import { TweetWithRepliesDTO } from './../../shared/_interfaces/tweetWithRepliesDTO.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from 'src/app/shared/services/tweet.service';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/token.service';
import { LikeService } from 'src/app/shared/services/like.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnInit {

  tweet: TweetWithRepliesDTO;
  id: number;
  currentUser: any;
  constructor(
    private tweetService: TweetService, 
    private route: ActivatedRoute, 
    private _tweetService: TweetService,
    private _tokenService: TokenService,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['page'];
    this.tweetService.getTweet(this.id).subscribe(
      res => { this.tweet = res; console.log(res) },
      err => console.log(err));
      
    this.currentUser = this._tokenService.getUser();
  }

  public createResourcesPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }

  deleteTweet(id: number) {
    console.log(id);
    this._tweetService.deleteTweet(id).subscribe((res) => {});
  }

  getDate(date: Date){
    let d = new Date(date);
    let momentOfPost = moment(date).add(-d.getTimezoneOffset(), 'minutes');
    let momentOfNow = moment();
    var difference = momentOfNow.diff(momentOfPost, "days");
    if(difference == 0)
    {
      //within few hours
      return momentOfPost.format("h:mma");
    }
    else {
      if(momentOfNow.year() - momentOfPost.year() >= 1)
      {
        return momentOfPost.format("MMM D, YYYY")
      }
      return momentOfPost.format("MMM D"); // within the same year
    }
  }
  getDateOfToolTip(date: Date){
    let d = new Date(date);
    let momentOfPost = moment(date).add(-d.getTimezoneOffset(), 'minutes');
    return momentOfPost.format("h:mm A . MMM D, YYYY");
  }
}

