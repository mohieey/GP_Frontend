import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PostTweetService } from '../shared/services/post-tweet.service';
import { TokenService } from '../shared/services/token.service';
import { TweetService } from '../shared/services/tweet.service';
import { TweetDTO } from '../shared/_interfaces/tweetDTO';
import { PostTweetComponent } from '../TweetComponents/post-tweet/post-tweet.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  tweets: TweetDTO[] = [];

  modal: HTMLElement;
  modalWrapper: HTMLElement;
  modalInput: HTMLInputElement;
  page: string;
  display: boolean;
  currentUser:any;
  @ViewChild(PostTweetComponent) postTweetComponent: PostTweetComponent;
  constructor(private _tweetService: TweetService, 
    private _router: Router,
    private route: ActivatedRoute,
    public postTweetService: PostTweetService,
    private _tokenService:TokenService) { }



  ngOnInit(): void {
    this.getTweets();
    this.modalWrapper = document.querySelector('.modal-wrapper');
    this.route.paramMap.subscribe(params => {
      this.page = params.get('page');
    })
    this.currentUser = this._tokenService.getUser();
  }
  getTweets() {
    this._tweetService.getHomePageTweets().subscribe((res) => {
      this.tweets = res;
      console.log(res);
    });
  }

  openPostTweetWindow(id?: number) {
    this.postTweetComponent.TweetId = id;
    this.modalWrapper.classList.add('modal-wrapper-display');
    this.postTweetComponent.openPostTweetWindow();
  }

  closePostTweetWindow() {
    this.modalWrapper.classList.remove('modal-wrapper-display');
  }

  public createResourcesPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }

}
