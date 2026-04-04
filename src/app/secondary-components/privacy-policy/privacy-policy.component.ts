import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { TranslateDirective } from '@ngx-translate/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css'],
  imports: [NavbarComponent, TranslateDirective]
})
export class PrivacyPolicyComponent implements OnInit {
  private seoService = inject(SeoService);


  ngOnInit(): void {
    this.updateSeoMetadata();
  }

  private updateSeoMetadata(): void {
    this.seoService.updateMetadata({
      title: 'Lucas Brito - Privacy Policy',
      description: 'Privacy Policy for Lucas Brito\'s personal website. Learn about data collection, usage, and protection practices.',
      keywords: 'Privacy Policy, Data Protection, Lucas Brito Privacy',
      type: 'article'
    });
  }
}
