import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BookmarkService } from 'src/app/shared/services/bookmark.service';
import { LikeService } from 'src/app/shared/services/like.service';
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

  constructor(private _tokenService: TokenService,
     private _tweetService: TweetService,
     private _likeService: LikeService,
     private _bookmarkService:BookmarkService) { }

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

  likeOrDislike(tweetId: number, isLiked: boolean) {
    if (!isLiked) {
      isLiked = false;
      this._likeService.like(tweetId).subscribe(
        (data) => { },
        (error) => {
          //  this.errorMsg = error;
        }
      );
    } else {
      isLiked = true;
      this._likeService.dislike(tweetId).subscribe(
        (data) => { },
        (error) => {
          //  this.errorMsg = error;
        }
      );
    }
    this.replies.forEach((tweet) => {
      if (tweet.id == tweetId) {
        tweet.isLiked = !tweet.isLiked;
        tweet.likeCount = isLiked ? tweet.likeCount - 1 : tweet.likeCount + 1;
      }
    });
  }
  bookmarkOrRemoveBookmark(tweetId: number, isBookmarked: boolean) {
    if (!isBookmarked) {
      isBookmarked = false;
      this._bookmarkService.bookmark(tweetId).subscribe(
        (data) => { },
        (error) => {
          //  this.errorMsg = error;
        }
      );
    } else {
      isBookmarked = true;
      this._bookmarkService.removeBookmark(tweetId).subscribe(
        (data) => { },
        (error) => {
          //  this.errorMsg = error;
        }
      );
    }
    this.replies.forEach((tweet) => {
      if (tweet.id == tweetId) {
        tweet.isBookmarked = !tweet.isBookmarked;
        tweet.bookmarkCount = isBookmarked
          ? tweet.bookmarkCount - 1
          : tweet.bookmarkCount + 1;
      }
    });
  }

  getImageClasses(imgCount: number) {
    if (imgCount === 1) {
      return 'img-count-1';
    }

    if (imgCount === 2) {
      return 'img-count-2';
    }

    if (imgCount === 3) {
      return 'img-count-3';
    }

    if (imgCount === 4) {
      return 'img-count-4';
    }
  }
}
