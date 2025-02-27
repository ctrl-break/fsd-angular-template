import { Post, PostService } from '@/entities/post';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-post',
    imports: [CommonModule],
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
})
export class PostComponent {
    postService = inject(PostService);

    post$: Observable<Post> | undefined;

    @Input() set postId(id: number) {
        this.post$ = id ? this.postService.getPost(id) : of();
    }
}
