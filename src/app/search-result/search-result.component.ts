import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _searchService: SearchService,
    private _router: Router) { }

  ngOnInit(): void {
    this.getUsersCount();
    this.getSelectedPage(1);
    console.log(this.allUsers);
  }

  private getUsersCount() {
    this._searchService.getUsersCount("keqo").subscribe(
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
      keyword: "keqo",
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

}
