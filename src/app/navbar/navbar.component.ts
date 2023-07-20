import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KonnektorService } from '../services/konnektor.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private konnektorService: KonnektorService
  ) {}

  ngOnInit() {
    this.konnektorService.setNavigationListener();
  }
}
