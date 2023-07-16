import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  naviList: any;
  navToggle: any;
  nav: any;
  main: any;
  logo_small: any;
  logo_large: any;

  ngOnInit() {
    this.navToggle = document.querySelector('.nav-toggle');
    this.main = document.querySelector('.main');
    this.logo_small = document.querySelector('.logo-small');
    this.logo_large = document.querySelector('.logo-large');
    this.nav = document.querySelector('.navigation');

    this.navToggle?.addEventListener('click', () => {
      this.nav.classList.toggle('nav-size');
      this.logo_small.classList.contains('opacity-1')
        ? this.logo_small.classList.toggle('opacity-1')
        : setTimeout(() => {
            this.logo_small.classList.toggle('opacity-1');
          }, 500);
      this.main.classList.toggle('main-large');
      this.navToggle?.classList.toggle('nav-toggle-turn');
      console.log(window.innerWidth);
      console.log(screen.width);
      screen.width > 991 ? this.logo_large.classList.toggle('opacity-1') : 0;
    });
  }
}
