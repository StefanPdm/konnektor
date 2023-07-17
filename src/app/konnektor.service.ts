import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KonnektorService {
  constructor() {}
  navListeners: any;
  main: any;

  // Navigation Services
  setNavigationListener() {
    this.main = document.querySelector('.main');
    this.navListeners = document.querySelectorAll('.navigation li');
    this.navListeners.forEach((item: any) => {
      item.addEventListener('click', () => {
        this.setActiveNavLink(item);
      });
    });
  }

  getMain(): any {
    this.main = document.querySelector('.main');
    console.log(this.main);
    return this.main;
  }

  setMain() {
    this.main.classList.toggle('main-large');
  }

  setActiveNavLink(item: HTMLElement) {
    this.navListeners.forEach((listener: any) => {
      listener.classList.remove('active');
    });
    item.classList.add('active');
  }
}
