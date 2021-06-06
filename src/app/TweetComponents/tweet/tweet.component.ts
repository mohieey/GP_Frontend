import { HomeComponent } from './../../home/home.component';
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
  modal: HTMLElement;
  modalWrapper: HTMLElement;

  constructor(private homeComponent: HomeComponent) { }

  ngOnInit(): void {

  }

  public createResourcesPath = (serverPath: string) => {

    return `${environment.apiUrl}/${serverPath}`;

  }
}
