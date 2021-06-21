import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BookmarkService } from '../shared/services/bookmark.service';
import { FollowingService } from '../shared/services/following.service';
import { LikeService } from '../shared/services/like.service';
import { PostTweetService } from '../shared/services/post-tweet.service';
import { TokenService } from '../shared/services/token.service';
import { TweetService } from '../shared/services/tweet.service';
import { TweetDTO } from '../shared/_interfaces/tweetDTO';
import { UserInteractionDetailsDTO } from '../shared/_interfaces/userInteractionDetailsDTO.model';
import { PostTweetComponent } from '../TweetComponents/post-tweet/post-tweet.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  // tweets: UserInteractionDetailsDTO[] = [];
  tweets: TweetDTO[] = []
  // followingUsers:UserInteractionDetailsDTO[] = []
  // followerUsers:UserInteractionDetailsDTO[] = []
  followUsersForModal:UserInteractionDetailsDTO[] = []
  modalHeader:string = ''
  currentSelectedTabHeader:string = 'tweets'
  currentPageNumber: number = 1;
  currentModalNumber: number = 1;
  pageSize : number = 1;

  modal: HTMLElement;
  modalWrapper: HTMLElement;
  modalInput: HTMLInputElement;
  page: string;
  display: boolean;
  currentUser:any;
  @ViewChild(PostTweetComponent) postTweetComponent: PostTweetComponent;
  constructor(
    private _tweetService: TweetService, 
    private _router: Router,
    private route: ActivatedRoute,
    public postTweetService: PostTweetService,
    private _tokenService:TokenService,
    private _followingService: FollowingService,
    private _likeService: LikeService,
    private _bookmarkService: BookmarkService) { }



  ngOnInit(): void {
    this.getTweetsForSelectedTab()
    this.getFollowing()
    this.getFollowers()
    this.modalWrapper = document.querySelector('.modal-wrapper');
    this.route.paramMap.subscribe(params => {
      this.page = params.get('page');
    })
    this.currentUser = this._tokenService.getUser();
  }

  isDarkModeEnabled = () => window.localStorage.getItem('darkmode') == 'dark';
  
  getFollowing() {
    this._followingService.getFollowingByPage(this.pageSize, this.currentModalNumber++).subscribe((res) => {
      if(res.length > 0) {
        this.followUsersForModal.push(...res);
      } else {
        this.hideOrShowLoadMoreUsersButton()
      }
    });
  }

  getFollowers() {
    this._followingService.getFollowersByPage(this.pageSize, this.currentModalNumber++).subscribe((res) => {
      if(res.length > 0) {
        this.followUsersForModal.push(...res);
      } else {
        this.hideOrShowLoadMoreUsersButton()
      }
    });
  }

  getMyTweets () {
    this._tweetService.getMyTweets(this.pageSize, this.currentPageNumber++).subscribe((res) => {
      if(res.length > 0) {
        this.tweets.push(...res);
      } else {
        this.hideOrShowLoadMoreButton()
      }
    });
  }

  getMyLikes() {
    this._likeService.getMyLikesByPage(this.pageSize, this.currentPageNumber++).subscribe((res) => {
      if(res.length > 0) {
        this.tweets.push(...res);
      } else {
        this.hideOrShowLoadMoreButton()
      }
    })
  }

  getMyBookmarks() {
    this._bookmarkService.getMyBookmarksByPage(this.pageSize, this.currentPageNumber++).subscribe((res) => {
      if(res.length > 0) {
        this.tweets.push(...res);
      } else {
        this.hideOrShowLoadMoreButton()
      }
    })
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
    return `${environment.apiUrl}/${serverPath}`
  }

  changeTab(tabHeader) {
    this.currentSelectedTabHeader = tabHeader.parentElement.getAttribute('data-value')
    
    const liElements = document.getElementById('tweet-tabs').children
    
    for (let element of Array.from(liElements)) {
      if(element.classList.contains('active'))
        element.classList.remove('active')        
      if(element.getAttribute('data-value') === this.currentSelectedTabHeader)
        element.classList.add('active')
    }
    this.currentPageNumber = 1
    this.tweets = []
    this.getTweetsForSelectedTab()
    this.hideOrShowLoadMoreButton()
  }

  getTweetsForSelectedTab() {
    switch (this.currentSelectedTabHeader) {
      case 'tweets': this.getMyTweets(); break;
      case 'retweets_replies': this.tweets = []; break;
      case 'likes': this.getMyLikes(); break;
      case 'bookmarks': this.getMyBookmarks(); break;
      default: break;
    }
  }

  getFollowersOrFollowing() {
    switch (this.modalHeader) {
      case 'Following': this.getFollowing(); break;
      case 'Followers': this.getFollowers(); break;
      default: break;
    }
  }

  openFollowModal(element) {
    this.currentModalNumber = 1
    this.followUsersForModal = []

    console.log(element.id);
    if(element.id === 'followings') {
      this.modalHeader = 'Following'
    } else {
      this.modalHeader = 'Followers'
    }
      this.getFollowersOrFollowing();
  }

  hideOrShowLoadMoreButton() {
    document.querySelector('.load-more-btn').classList.toggle('d-none')
    document.querySelector('#all-caught-up-text').classList.toggle('d-none')
  }

  hideOrShowLoadMoreUsersButton() {
    document.querySelector('.load-more-users-btn').classList.toggle('d-none')
    document.querySelector('#no-more-users-text').classList.toggle('d-none')
  }
}
