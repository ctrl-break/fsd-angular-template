import { UserComponent } from '@/entities/user';
import { UsersListComponent } from '@/features/users-list';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'users', component: UsersListComponent },
            {
                path: 'users/:id',
                component: UserComponent,
                // children: [
                //   // При выборе пользователя по умолчанию переходим к постам
                //   { path: '', redirectTo: 'posts', pathMatch: 'full' },
                //   { path: 'posts', component: PostsListComponent },
                //   { path: 'posts/:postId', component: PostDetailComponent }
                //   // Можно добавить маршруты для комментариев и альбомов
                // ]
            },
        ],
    },
];
