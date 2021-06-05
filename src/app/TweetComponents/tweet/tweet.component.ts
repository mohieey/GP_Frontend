import { environment } from './../../../environments/environment';
import { TweetDTO } from '../../shared/_interfaces/tweetDTO';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweetList: TweetDTO[];
  constructor() { }

  ngOnInit(): void {
  }

  public createImgPath = (serverPath: string) => {

    return `${environment.apiUrl}/${serverPath}`;

  }
}
