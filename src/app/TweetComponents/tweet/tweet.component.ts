import { HomeComponent } from './../../home/home.component';
import { environment } from './../../../environments/environment';
import { TweetDTO } from '../../shared/_interfaces/tweetDTO';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';
import { TweetService } from 'src/app/shared/services/tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweetList: TweetDTO[];
  modal: HTMLElement;
  modalWrapper: HTMLElement;
  currentUser:any;

  @Output() onReply: EventEmitter<any> = new EventEmitter();
  constructor(private tokenService:TokenService, private tweeetService:TweetService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
  }

  public createResourcesPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }

  addReply(id) {
    this.onReply.emit(+id);
  }

  deleteTweet(id:number)
  {
    console.log(id);
    this.tweeetService.deleteTweet(id).subscribe((res) => {});
  }
}
