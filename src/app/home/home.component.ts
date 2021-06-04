import { TweetDTO } from './../shared/_interfaces/tweetDTO';
import { Component, OnInit } from '@angular/core';
import { TweetService } from '../shared/services/tweet.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePageTweets: TweetDTO[];

  constructor(private _tweetService: TweetService, private _router: Router, private route: ActivatedRoute) { }

  search(event) {
    this._router.navigate(['/search'], { queryParams: { key: event.target.value } })
  }
  modal: HTMLElement;
  modalWrapper: HTMLElement;
  modalInput: HTMLInputElement;
  page: string;


  ngOnInit(): void {
    this._tweetService.getHomePageTweets().subscribe(res => { this.homePageTweets = res; console.log(res) })
    this.modal = document.querySelector('.modal');
    this.modalWrapper = document.querySelector('.modal-wrapper');
    this.modalInput = document.querySelector('.modal-input');
    this.route.paramMap.subscribe(params => {
      this.page = params.get('page');
    })

  }

  openPostTweetWindow() {
    this.modal.style.display = 'block';
    this.modalWrapper.classList.add('modal-wrapper-display');
  }

  closePostTweetWindow() {
    this.modal.style.display = 'none';
    this.modalWrapper.classList.remove('modal-wrapper-display');

    if (this.modalInput.value !== '') {
      this.modalInput.value = '';
    }

  }

  urls = new Array<string>();
  detectFiles(event) {
    this.urls = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        }
        reader.readAsDataURL(file);
      }
    }
  }
}
