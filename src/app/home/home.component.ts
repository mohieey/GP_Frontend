import { TweetDTO } from './../shared/_interfaces/tweetDTO';
import { Component, OnInit } from '@angular/core';
import { TweetService } from '../shared/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homePageTweets: TweetDTO[];
  modal:HTMLElement;
  modalWrapper:HTMLElement;
  modalInput:HTMLInputElement;

  constructor(private tweetService: TweetService) { }

  ngOnInit(): void {
    this.tweetService.getHomePageTweets().subscribe(res => { this.homePageTweets = res; console.log(res) })
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
