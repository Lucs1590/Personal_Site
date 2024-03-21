import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StravaService {
  private annualGoalsUrl = 'https://api.strava.com/path/to/annual/goals';
  private weeklyProgressUrl = 'https://api.strava.com/path/to/weekly/progress';

  constructor(private http: HttpClient) {}

  getAnnualGoals(): Observable<any> {
    return this.http.get(this.annualGoalsUrl);
  }

  getWeeklyProgress(): Observable<any> {
    return this.http.get(this.weeklyProgressUrl);
  }
}
