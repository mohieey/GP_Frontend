import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SharedService } from '../shared/services/shared.service';
import { TokenService } from '../shared/services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  currentUser: any;
  constructor(private _router: Router, private _shared: SharedService, private _tokenService: TokenService) { }

  ngOnInit(): void {
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarWrapper = document.querySelector('.sidebar-wrapper');
    this.circle = document.querySelector('.circle');
    this.currentUser = this._tokenService.getUser();
    console.log(this.currentUser)
  }

  search(event) {
    this._router.navigate(['/search'], {
      queryParams: { key: event.target.value },
    });
  }

  // Sidebar

  sidebar: Element;
  sidebarWrapper: Element;

  Display() {
    console.log(this.sidebar);

    this.sidebar.classList.add('sidebar-display');
    this.sidebarWrapper.classList.add('sidebar-wrapper-display');
  }

  Dismiss() {
    this.sidebar.classList.remove('sidebar-display');
    this.sidebarWrapper.classList.remove('sidebar-wrapper-display');
  }

  circle: Element;

  supportDarkMode() {
    this.circle.classList.toggle('move');
    if (window.localStorage.getItem('darkmode') == 'light')
      window.localStorage.setItem('darkmode', 'dark');
    else {
      window.localStorage.setItem('darkmode', 'light');
    }
    this._shared.sendClickEvent();
  }

  public createResourcesPath = (serverPath: string) => {
    return `${environment.apiUrl}/${serverPath}`;
  }
}
