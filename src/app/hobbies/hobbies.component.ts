import { Component, OnInit } from '@angular/core';
import { StravaService } from '../services/strava.service';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {

  booksRead: string[] = ['Book 1', 'Book 2', 'Book 3'];
  booksReading: string[] = ['Book 4', 'Book 5'];
  sportsData: any;
  setupItems: string[] = ['Item 1', 'Item 2', 'Item 3'];

  constructor(private stravaService: StravaService) { }

  ngOnInit(): void {
    this.fetchSportsData();
  }

  fetchSportsData(): void {
    this.stravaService.getRecentActivities().subscribe(data => {
      this.sportsData = data;
    });
  }
}
