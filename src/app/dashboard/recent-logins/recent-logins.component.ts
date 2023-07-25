import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.class';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-recent-logins',
  templateUrl: './recent-logins.component.html',
  styleUrls: ['./recent-logins.component.scss'],
})
export class RecentLoginsComponent implements OnInit {
  constructor(private dataService: DataService) {}

  users: User[] = [];
  showSpinner: boolean = true;

  ngOnInit(): void {
    this.dataService.loading$.subscribe((value) => {
      this.showSpinner = value;
    });

    this.users = this.dataService.getUsers();
    this.users.sort((a, b) => {
      const dateA = new Date(a.last_login_date).getDate();
      const dateB = new Date(b.last_login_date).getDate();
      return dateA - dateB;
    });
    this.users.reverse();
  }
}
