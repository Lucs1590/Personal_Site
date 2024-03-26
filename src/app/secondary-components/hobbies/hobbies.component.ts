import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {
  bookList: any[] = [];
  sportsData: any = {};
  computerSetup: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBookList();
    this.fetchSportsData();
    this.fetchComputerSetup();
  }

  fetchBookList() {
    // Simulate fetching booklist data
    this.bookList = [
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt and David Thomas' },
      { title: 'Clean Code', author: 'Robert C. Martin' }
    ];
  }

  fetchSportsData() {
    // Simulate fetching sports data from Strava
    this.http.get('https://api.strava.com/path/to/user/data').subscribe({
      next: (data) => this.sportsData = data,
      error: (error) => console.error('Failed to fetch sports data', error)
    });
  }

  fetchComputerSetup() {
    // Simulate fetching computer setup data
    this.computerSetup = [
      { item: 'Laptop', model: 'MacBook Pro 16-inch' },
      { item: 'Monitor', model: 'Dell Ultrasharp 27"' }
    ];
  }
}
