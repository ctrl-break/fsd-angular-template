import { AllAlbumsComponent } from '@/entities/albums-list';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-albums',
    imports: [CommonModule, AllAlbumsComponent],
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent {}
