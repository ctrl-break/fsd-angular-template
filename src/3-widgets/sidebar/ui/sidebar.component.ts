import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    router = inject(Router);
    route = inject(ActivatedRoute);

    routeParams$ = this.route.params;

    navigateTo(userId: string, section: string): void {
        this.router.navigate([`/users`, userId, section]);
    }
}
