import { PostTweetComponent } from './../post-tweet/post-tweet.component';
import { PostTweetService } from './../shared/services/post-tweet.service';
import { TweetDTO } from './../shared/_interfaces/tweetDTO';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TweetService } from '../shared/services/tweet.service';
import { Router, ActivatedRoute } from '@angular/router';


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
    this._tweetService.getHomePageTweets().subscribe((res) => {
      this.homePageTweets = res;
      console.log(res);
    });

    this.modalWrapper = document.querySelector('.modal-wrapper');
    this.route.paramMap.subscribe(params => {
      this.page = params.get('page');
    })
  }

  search(event) {
    this._router.navigate(['/search'], { queryParams: { key: event.target.value } })
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarWrapper = document.querySelector('.sidebar-wrapper');

    this.darkElements1 = document.querySelectorAll('.dark-mode-1');
    this.darkElements2 = document.querySelectorAll('.dark-mode-2');
    this.lighTexts = document.querySelectorAll('.light-text');
    this.borders = document.querySelectorAll('.border');
    this.circle = document.querySelector('.circle');
  }

  openPostTweetWindow() {
    this.modalWrapper.classList.add('modal-wrapper-display');
    this.postTweetComponent.openPostTweetWindow();

  }


  // Sidebar

  sidebar: Element;
  sidebarWrapper: Element;

  Display() {
    this.sidebar.classList.add('sidebar-display');
    this.sidebarWrapper.classList.add('sidebar-wrapper-display');
  }

  Dismiss() {
    this.sidebar.classList.remove('sidebar-display');
    this.sidebarWrapper.classList.remove('sidebar-wrapper-display');
  }

  // dark mode

  darkElements1: NodeListOf<Element>;
  darkElements2: NodeListOf<Element>;
  lighTexts: NodeListOf<Element>;
  borders: NodeListOf<Element>;
  circle: Element;

  supportDarkMode() {
    this.circle.classList.toggle('move');
    Array.from(this.darkElements1).map((darkEl1) =>
      darkEl1.classList.toggle('dark-1')
    );
    Array.from(this.darkElements2).map((darkEl2) =>
      darkEl2.classList.toggle('dark-2')
    );
    Array.from(this.lighTexts).map((lighText) =>
      lighText.classList.toggle('light')
    );
    Array.from(this.borders).map((border) =>
      border.classList.toggle('border-color')
    );
  }
}
