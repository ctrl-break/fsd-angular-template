import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '@/shared/config';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${BASE_URL}/users`);
    }

    getUser(id: number): Observable<User> {
        return this.http.get<User>(`${BASE_URL}/users/${id}`);
    }
}
