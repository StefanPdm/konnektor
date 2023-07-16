import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class KonnektorService {
  constructor() {}
  navListeners: any;

  // Navigation Services
  setNavigationListener() {
    this.navListeners = document.querySelectorAll('.navigation li');
    this.navListeners.forEach((item: any) => {
      item.addEventListener('click', () => {
        this.setActiveNavLink(item);
      });
    });
  }

  setActiveNavLink(item: HTMLElement) {
    this.navListeners.forEach((listener: any) => {
      listener.classList.remove('active');
    });
    item.classList.add('active');
  }
}
