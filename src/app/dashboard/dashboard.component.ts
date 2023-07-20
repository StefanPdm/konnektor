import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  konnektors: any[] = [];
  public konnektor: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.konnektors = this.dataService.getKonnektors();
    console.log('konnektors', this.konnektors);
    console.log('konnektors', this.konnektors.length);
  }
}
