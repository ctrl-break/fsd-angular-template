import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '@/shared/config';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    constructor(private http: HttpClient) {}

    getPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(`${BASE_URL}/posts`);
    }

    getPostsByUserId(userId: number): Observable<Post[]> {
        return this.http.get<Post[]>(`${BASE_URL}/posts?userId=${userId}`);
    }

    getPost(id: number): Observable<Post> {
        return this.http.get<Post>(`${BASE_URL}/posts/${id}`);
    }

    createPost(post: Post): Observable<Post> {
        return this.http.post<Post>(`${BASE_URL}/posts`, post);
    }

    updatePost(id: number, post: Post): Observable<Post> {
        return this.http.put<Post>(`${BASE_URL}/posts/${id}`, post);
    }

    partialUpdatePost(id: number, partialPost: Partial<Post>): Observable<Post> {
        return this.http.patch<Post>(`${BASE_URL}/posts/${id}`, partialPost);
    }

    deletePost(id: number): Observable<unknown> {
        return this.http.delete(`${BASE_URL}/posts/${id}`);
    }
}
