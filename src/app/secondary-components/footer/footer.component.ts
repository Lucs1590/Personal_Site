import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TranslateDirective } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    imports: [FaIconComponent, TranslateDirective, RouterLink]
})
export class FooterComponent {
    readonly year = new Date().getFullYear();

    readonly socialLinks = [
        { icon: ['fab', 'github'], url: 'https://github.com/Lucs1590', label: 'GitHub' },
        { icon: ['fab', 'linkedin'], url: 'https://www.linkedin.com/in/lucas-brito100/', label: 'LinkedIn' },
        { icon: ['fab', 'twitter'], url: 'https://twitter.com/Lucs1590', label: 'Twitter' },
        { icon: ['fab', 'medium'], url: 'https://medium.com/@lucasbsilva29', label: 'Medium' }
    ];
}
