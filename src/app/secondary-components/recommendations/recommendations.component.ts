import { Component, Input, OnInit } from '@angular/core';
import { LinkedInRecommendation, linkedInRecommendations } from 'src/assets/static_data/recommendations';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
  standalone: false
})
export class RecommendationsComponent implements OnInit {

  @Input() isEmbedded = false;

  recommendations: LinkedInRecommendation[] = this.getShuffledRecommendations();
  expandedMap: { [id: number]: boolean } = {};
  readonly truncateLength = 200;

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    if (!this.isEmbedded) {
      this.updateSeoMetadata();
    }
  }

  private updateSeoMetadata(): void {
    this.seoService.updateMetadata({
      title: 'Lucas Brito - Recommendations | Professional Testimonials',
      description: 'Read professional recommendations and testimonials from colleagues who have worked with Lucas Brito. Discover insights about his professional skills and work ethic.',
      keywords: 'Lucas Brito Recommendations, Professional Testimonials, Work References, Colleague Reviews'
    });
  }

  isExpanded(id: number): boolean {
    return !!this.expandedMap[id];
  }

  toggleExpanded(id: number): void {
    this.expandedMap[id] = !this.expandedMap[id];
  }

  getDisplayText(recommendation: LinkedInRecommendation): string {
    if (this.isExpanded(recommendation.id) || recommendation.recommendationText.length <= this.truncateLength) {
      return recommendation.recommendationText;
    }
    return recommendation.recommendationText.slice(0, this.truncateLength) + '…';
  }

  isTruncatable(recommendation: LinkedInRecommendation): boolean {
    return recommendation.recommendationText.length > this.truncateLength;
  }

  trackById(index: number, recommendation: LinkedInRecommendation): number {
    return recommendation.id;
  }

  private getShuffledRecommendations(): LinkedInRecommendation[] {
    const copied = [...linkedInRecommendations];
    for (let i = copied.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied.slice(0, 8);
  }
}
