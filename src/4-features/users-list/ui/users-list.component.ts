import { User, UserService } from '@/entities/user';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users-list',
    imports: [CommonModule],
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
    userService = inject(UserService);
    router = inject(Router);

    users$ = this.userService.getUsers();

    selectUser(user: User): void {
        this.router.navigate(['/users', user.id]);
    }
}
