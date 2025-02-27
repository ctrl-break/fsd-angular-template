import { AlbumsListService } from '@/entities/albums-list';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
    selector: 'app-albums-list',
    imports: [CommonModule],
    templateUrl: './albums-list.component.html',
    styleUrls: ['./albums-list.component.scss'],
})
export class AlbumsListComponent {
    route = inject(ActivatedRoute);
    albumsListService = inject(AlbumsListService);

    albums$ = this.route.parent?.params.pipe(
        map((params) => params['id']),
        switchMap((id) => this.albumsListService.getUserAlbums(id)),
    );
}
