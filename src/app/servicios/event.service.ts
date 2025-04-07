import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:5000/events/';

  constructor(private http: HttpClient) {}

  getUpcomingEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'upcoming');
  }

  getEventoById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

}
