import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ChatService } from '../shared/services/chat.service';
import { SearchService } from '../shared/services/search.service';
import { DetailsUserDTO } from '../shared/_interfaces/detailsUserDTO.model';
import { SearchDTO } from '../shared/_interfaces/searchDTO.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  usersCount: number;
  pageSize: number = 2;
  currentPageNumber: number = 1;
  numberOfPages: number;
  allUsers: DetailsUserDTO[];
  hasUsers: boolean = false;
  searchKey: string;

  constructor(
    private _searchService: SearchService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute, 
    private _chatService: ChatService
    ) { }

  ngOnInit(): void {
    this._activatedRouter.queryParamMap.subscribe( params=>{
        this.searchKey = params.get('key');
      }
    )
    this.getUsersCount();
    this.getSelectedPage(1);
  }

  private getUsersCount() {
    this._searchService.getUsersCount(this.searchKey).subscribe(
      data => {
        this.usersCount = data
        this.numberOfPages = Math.ceil(this.usersCount / this.pageSize)
      },
      error => {
        //  this.errorMsg = error;
      }
    )
  }

  counter(i: number) {
    return new Array(i);
  }
  getSelectedPage(currentPageNumber: number) {
    let searchDto: SearchDTO = {
      keyword: this.searchKey,
      pageSize: this.pageSize,
      pageNumber: currentPageNumber,
    }
    this._searchService.getUsersByPage(searchDto).subscribe(
      data => {
        this.allUsers = data
        this.currentPageNumber = currentPageNumber;
        if (data.length != 0)
          this.hasUsers = true;
        else
          this.hasUsers = false;

      },
      error => {
        //this.errorMsg = error;
      }
    )
  }

  openChat(userTo){
    //this._router.navigateByUrl["http://localhost:1998/"];
    console.log(userTo);
    this._chatService.joinChat(userTo).subscribe(
      data => {
          // if (data[0].status == 201) {
          //   this._router.navigateByUrl(`${environment.chatUrl}`);
          // }
          // console.log(data[0].json);
        // console.log(data)
        //window.open("https://localhost:1998", "_blank");
        //window.location.href = "https://localhost:1998";
      },
      error => {
        console.log(error)
        //  this.errorMsg = error;
      }
    )
  }

}
