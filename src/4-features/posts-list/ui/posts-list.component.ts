import { PostService } from '@/entities/post';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
    selector: 'app-posts-list',
    imports: [CommonModule],
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
    postService = inject(PostService);
    route = inject(ActivatedRoute);

    posts$ = this.route.parent?.params.pipe(
        map((params) => params['id']),
        switchMap((id) => this.postService.getPostsByUserId(id)),
    );
}
