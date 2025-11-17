import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.css'],
    standalone: false
})
export class PrivacyPolicyComponent implements OnInit {

  constructor(private seoService: SeoService) { }

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
