import { User, UserService } from '@/entities/user';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-user',
    imports: [CommonModule, RouterOutlet],
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent {
    route = inject(ActivatedRoute);
    userService = inject(UserService);

    user$: Observable<User> | undefined;

    @Input() set id(_id: number) {
        this.user$ = _id ? this.userService.getUser(_id) : of();
    }
}
