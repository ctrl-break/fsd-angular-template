import { AlbumsListComponent } from '@/entities/albums-list';
import { PostComponent } from '@/entities/post';
import { UserComponent } from '@/entities/user';
import { PostsListComponent } from '@/features/posts-list';
import { AlbumsComponent } from '@/pages/albums';
import { UsersComponent } from '@/pages/users';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: UsersComponent },
            {
                path: 'users/:id',
                component: UserComponent,
                children: [
                    { path: '', redirectTo: 'posts', pathMatch: 'full' },
                    { path: 'posts', component: PostsListComponent },
                    { path: 'posts/:postId', component: PostComponent },
                    { path: 'albums', component: AlbumsListComponent },
                ],
            },

            { path: 'albums', component: AlbumsComponent },
        ],
    },
];
