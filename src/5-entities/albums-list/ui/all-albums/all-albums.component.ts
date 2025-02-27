import { AlbumsListService } from '@/entities/albums-list';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
    selector: 'app-all-albums',
    imports: [CommonModule],
    templateUrl: './all-albums.component.html',
    styleUrl: './all-albums.component.scss',
})
export class AllAlbumsComponent {
    albumsListService = inject(AlbumsListService);

    albums$ = this.albumsListService.getAlbums();
}
