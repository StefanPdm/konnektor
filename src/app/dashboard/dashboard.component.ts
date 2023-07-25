import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Konnektor } from '../models/konnektor.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public konnektors!: Konnektor[];
  showSpinner?: boolean;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.loading$.subscribe((value) => (this.showSpinner = value));

    this.dataService.pullDataFromServer();
    setTimeout(() => {
      this.konnektors = this.dataService.getKonnektors();
    }, 2500);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      // this.showSpinner = false;
    }, 3000);
  }
}
