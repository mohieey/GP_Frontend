import { PostTweetService } from './../shared/services/post-tweet.service';
import { TweetDTO } from './../shared/_interfaces/tweetDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TweetService } from '../shared/services/tweet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PostTweetComponent } from '../TweetComponents/post-tweet/post-tweet.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  homePageTweets: TweetDTO[];
  modal: HTMLElement;
  modalWrapper: HTMLElement;
  modalInput: HTMLInputElement;
  page: string;
  display: boolean;
  @ViewChild(PostTweetComponent) postTweetComponent: PostTweetComponent;
  constructor(private _tweetService: TweetService, private _router: Router, private route: ActivatedRoute, public postTweetService: PostTweetService) { }


  ngOnInit(): void {
    this.getTweets();
    this.modalWrapper = document.querySelector('.modal-wrapper');
    this.route.paramMap.subscribe(params => {
      this.page = params.get('page');
    })
  }
  getTweets() {
    this._tweetService.getHomePageTweets().subscribe((res) => {
      this.homePageTweets = res;
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
}
