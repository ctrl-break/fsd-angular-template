import { MainLayoutComponent } from '@/shared/ui/layouts/main-layout/main-layout.component';
import { HeaderComponent } from '@/widgets/header';
import { SidebarComponent } from '@/widgets/sidebar';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, MainLayoutComponent, HeaderComponent, SidebarComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'fsd-angular-template';

    router = inject(Router);

    showSidebar$: Observable<boolean> = this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => /^\/users\/\d+/.test(event.urlAfterRedirects)),
    );

    //   .subscribe((event: NavigationEnd) => {
    //     this.showSidebar = /^\/users\/\d+/.test(event.urlAfterRedirects);
    //   });
}
