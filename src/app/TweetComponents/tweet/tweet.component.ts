import { HomeComponent } from './../../home/home.component';
import { environment } from './../../../environments/environment';
import { TweetDTO } from '../../shared/_interfaces/tweetDTO';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';
import { TweetService } from 'src/app/shared/services/tweet.service';
import { LikeService } from 'src/app/shared/services/like.service';
import { BookmarkService } from 'src/app/shared/services/bookmark.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {
  @Input() tweetList: TweetDTO[];

  tweets: TweetDTO[];
  modal: HTMLElement;
  modalWrapper: HTMLElement;
  currentUser: any;

  @Output() onReply: EventEmitter<any> = new EventEmitter();
  constructor(
    private _tokenService: TokenService,
    private _tweeetService: TweetService,
    private _likeService: LikeService,
    private _bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.currentUser = this._tokenService.getUser();
  }

  public createResourcesPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  };

  addReply(id) {
    this.onReply.emit(+id);
  }

  deleteTweet(id: number) {
    console.log(id);
    this._tweeetService.deleteTweet(id).subscribe((res) => {});
  }

  likeOrDislike(tweetId: number, isLiked: boolean) {
    if (!isLiked) {
      isLiked = false;
      this._likeService.like(tweetId).subscribe(
        (data) => {},
        (error) => {
          //  this.errorMsg = error;
        }
      );
    } else {
      isLiked = true;
      this._likeService.dislike(tweetId).subscribe(
        (data) => {},
        (error) => {
          //  this.errorMsg = error;
        }
      );
    }
    this.tweetList.forEach((tweet) => {
      if(tweet.id == tweetId){
        tweet.isLiked = !tweet.isLiked
        tweet.likeCount = (isLiked) ? tweet.likeCount - 1 : tweet.likeCount + 1
      }
    })
  }

  bookmarkOrRemoveBookmark(tweetId: number, isBookmarked: boolean){
    if (!isBookmarked) {
      isBookmarked = false;
      this._bookmarkService.bookmark(tweetId).subscribe(
        (data) => {},
        (error) => {
          //  this.errorMsg = error;
        }
      );
    } else {
      isBookmarked = true;
      this._bookmarkService.removeBookmark(tweetId).subscribe(
        (data) => {},
        (error) => {
          //  this.errorMsg = error;
        }
      );
    }
    this.tweetList.forEach((tweet) => {
      if(tweet.id == tweetId){
        tweet.isBookmarked = !tweet.isBookmarked
        tweet.bookmarkCount = (isBookmarked) ? tweet.bookmarkCount - 1 : tweet.bookmarkCount + 1
      }
    })
  }
}
