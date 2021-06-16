import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TweetDTO } from 'src/app/shared/_interfaces/tweetDTO';

@Component({
  selector: 'app-tweet-replies',
  templateUrl: './tweet-replies.component.html',
  styleUrls: ['./tweet-replies.component.scss']
})
export class TweetRepliesComponent implements OnInit {

  @Input() replies: TweetDTO[];

  constructor() { }

  ngOnInit(): void {
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
}
