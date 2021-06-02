import { TweetDTO } from './../shared/_interfaces/tweetDTO';
import { Component, OnInit } from '@angular/core';
import { TweetService } from '../shared/services/tweet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePageTweets: TweetDTO[];

  constructor(private _tweetService: TweetService, private _router: Router) { }

  search(event){
    this._router.navigate(['/search'], { queryParams: { key: event.target.value } })
  }
  modal:HTMLElement;
  modalWrapper:HTMLElement;
  modalInput:HTMLInputElement;

  ngOnInit(): void {
    this._tweetService.getHomePageTweets().subscribe(res => { this.homePageTweets = res; console.log(res) })
    this.modal = document.querySelector('.modal');
    this.modalWrapper = document.querySelector('.modal-wrapper');
    this.modalInput = document.querySelector('.modal-input');
  }

  openPostTweetWindow(){
    this.modal.style.display = 'block';
	  this.modalWrapper.classList.add('modal-wrapper-display');
  }

  closePostTweetWindow(){
    this.modal.style.display = 'none';
    this.modalWrapper.classList.remove('modal-wrapper-display');

    if (this.modalInput.value !== '') {
      this.modalInput.value = '';
    }
    
  }
}
