import { UsersListComponent } from '@/features/users-list';
import { Component } from '@angular/core';

@Component({
    selector: 'app-users',
    imports: [UsersListComponent],
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent {}
