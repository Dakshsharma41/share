import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { query } from 'express';
import { map, Observable } from 'rxjs';


export interface User {
  id?: number;
  name: string;
  email?: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      map(users => {
        
        return users.map(user => ({
          id: user.id,
          name: user.name  || 'Unknown',
          email: user.email
        }));
      })
    );
  }

  
  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/search`, {
      params: { q: query }
    });
  }
  }





