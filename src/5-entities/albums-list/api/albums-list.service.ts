import { Injectable } from '@angular/core';
import { Album } from '../model/albums-list.model';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '@/shared/config';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AlbumsListService {
    constructor(private http: HttpClient) {}

    getAlbums(): Observable<Album[]> {
        return this.http.get<Album[]>(`${BASE_URL}/albums`);
    }
    getUserAlbums(userId: number): Observable<Album[]> {
        return this.http.get<Album[]>(`${BASE_URL}/albums?userId=${userId}`);
    }
}
