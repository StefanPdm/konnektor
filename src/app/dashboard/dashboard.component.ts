import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Konnektor } from '../models/konnektor.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public konnektors!: Konnektor[];
  // public konnektor: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.konnektors = this.dataService.getKonnektors();
  }
}
