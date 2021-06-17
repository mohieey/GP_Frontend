import { TweetWithRepliesDTO } from './../../shared/_interfaces/tweetWithRepliesDTO.model';
import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from 'src/app/shared/services/tweet.service';
import { environment } from 'src/environments/environment';
import { TokenService } from 'src/app/shared/services/token.service';
import { LikeService } from 'src/app/shared/services/like.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tweet-details',
  templateUrl: './tweet-details.component.html',
  styleUrls: ['./tweet-details.component.css']
})
export class TweetDetailsComponent implements OnInit {
  
  @ViewChild('closebutton') closebutton;

  tweet: TweetWithRepliesDTO;
  id: number;
  currentUser: any;
  constructor(
    private tweetService: TweetService, 
    private route: ActivatedRoute, 
    private _tweetService: TweetService,
    private _tokenService: TokenService,
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['page'];
    this.tweetService.getTweet(this.id).subscribe(
      res => { this.tweet = res },
      err => console.log(err));
      
    this.currentUser = this._tokenService.getUser();
  }

  // private wasInside = false;
  
  // @HostListener('click')
  // clickInsid() {
  //   console.log("clicked inside")
  //   this.wasInside = true;
  // }
  
  // @HostListener('document:click')
  // clickout() {
  //   if (!this.wasInside) {
  //   console.log("clicked outside")
  //   }
  //   this.wasInside = false;
  // }

  @HostListener('document:click', ['$event'])
  clickout(event) {  
    let element = event.target
    while (element.parentElement && element.parentElement.getAttribute('id') !== 'replyDiv') {
      element = element.parentElement
    }
    
    if(!element.parentElement) {
      // console.log(document.readyState);

    //   document.addEventListener('DOMContentLoaded', () => {
    // });
      this.hideReplyUIChange(event);
    
    }
  }

  public createResourcesPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }

  isDarkModeEnabled = () => (window.localStorage.getItem('darkmode') == 'dark');

  deleteTweet(id: number) {
    console.log(id);
    this._tweetService.deleteTweet(id).subscribe((res) => {});
  }

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

  getFullDate(date: Date){
    let d = new Date(date);
    let momentOfPost = moment(date).add(-d.getTimezoneOffset(), 'minutes');
    return `${momentOfPost.format("h:mm A · MMM D, YYYY · ")}Twirrer for Browser`;
  }

  showReplyUIChange(event) {
    // const elements = document.querySelectorAll('.reply-at-text, .reply-input-icons, #replyButtonNextToInput');
    
    // Array.from(elements).map((element) => {
    //   element.classList.toggle('d-flex')
    //   element.classList.toggle('d-none')
    // });

    document.querySelector("#mt5Class")?.classList.remove('mt-5')

    document.querySelector(".reply-at-text")?.classList.remove('d-none')
    document.querySelector(".reply-at-text")?.classList.add('d-flex')
    
    document.querySelector(".reply-input-icons")?.classList.remove('d-none')
    document.querySelector(".reply-input-icons")?.classList.add('d-flex')    

    document.querySelector("#replyButtonNextToInput")?.classList.remove('d-flex')
    document.querySelector("#replyButtonNextToInput")?.classList.add('d-none')
  }

  hideReplyUIChange(event) {
    document.querySelector("#mt5Class")?.classList.add('mt-5')

    document.querySelector(".reply-at-text")?.classList.add('d-none')
    document.querySelector(".reply-at-text")?.classList.remove('d-flex')
    
    document.querySelector(".reply-input-icons")?.classList.add('d-none')
    document.querySelector(".reply-input-icons")?.classList.remove('d-flex')    

    document.querySelector("#replyButtonNextToInput")?.classList.add('d-flex')
    document.querySelector("#replyButtonNextToInput")?.classList.remove('d-none')
  }

  getImageClasses(imgCount: number) {
    if(imgCount === 1) {
      return 'img-count-1'
    } 

    if(imgCount === 2) {
      return 'img-count-2'
    } 

    if(imgCount === 3) {      
      return 'img-count-3'
    } 

    if(imgCount === 4) {      
      return 'img-count-4'
    } 
  }

  private imgSourceToDisplayInModal:string = ''
  setImgResource(imgSource: string) {
    this.imgSourceToDisplayInModal = imgSource
  }

  getImageResource(){
    return this.imgSourceToDisplayInModal
  }

  closeModal() {
    this.closebutton.nativeElement.click();
  }
}

