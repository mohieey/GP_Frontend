import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private _router: Router, private _shared: SharedService) {}

  ngOnInit(): void {
    this.sidebar = document.querySelector('.sidebar');
    this.sidebarWrapper = document.querySelector('.sidebar-wrapper');

    this.circle = document.querySelector('.circle');
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

    this._shared.sendClickEvent();
  }
}
