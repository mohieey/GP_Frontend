import { HomeComponent } from './../../home/home.component';
import { environment } from './../../../environments/environment';
import { TweetDTO } from '../../shared/_interfaces/tweetDTO';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweetList: TweetDTO[];
  modal: HTMLElement;
  modalWrapper: HTMLElement;

  @Output() onReply: EventEmitter<any> = new EventEmitter();
  constructor(private homeComponent: HomeComponent, private tokenService:TokenService) { }

  ngOnInit(): void {
    console.log(this.tokenService.getToken());
  }

  public createResourcesPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }

  addReply(id) {
    this.onReply.emit(+id);
  }
}
