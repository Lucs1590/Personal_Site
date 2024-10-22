import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StravaService {
  private clientId = 'YOUR_CLIENT_ID';
  private clientSecret = 'YOUR_CLIENT_SECRET';
  private redirectUri = 'YOUR_REDIRECT_URI';
  private accessToken = 'YOUR_ACCESS_TOKEN';

  constructor(private http: HttpClient) { }

  getRecentActivities(): Observable<any> {
    const url = `https://www.strava.com/api/v3/athlete/activities?access_token=${this.accessToken}`;
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
