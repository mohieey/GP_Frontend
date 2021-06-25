import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TokenService } from 'src/app/shared/services/token.service';
import { TweetService } from 'src/app/shared/services/tweet.service';
import { TweetDTO } from 'src/app/shared/_interfaces/tweetDTO';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tweet-replies',
  templateUrl: './tweet-replies.component.html',
  styleUrls: ['./tweet-replies.component.scss']
})
export class TweetRepliesComponent implements OnInit {

  @Input() replies: TweetDTO[];
  currentUser: any;

  constructor(private _tokenService: TokenService, private _tweetService: TweetService) { }

  ngOnInit(): void {
    this.currentUser = this._tokenService.getUser();
  }
  
  isDarkModeEnabled = () => (window.localStorage.getItem('darkmode') == 'dark');

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

  deleteTweet(id: number) {
    console.log(id);
    this._tweetService.deleteTweet(id).subscribe((res) => {
      var tweet = this.replies.find( t => t.id == id);
      this.replies.splice(this.replies.indexOf(tweet),1);
    });
  }

  public createResourcesPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
}
