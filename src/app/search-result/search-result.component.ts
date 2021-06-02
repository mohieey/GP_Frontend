import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _activatedRouter: ActivatedRoute
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

}
