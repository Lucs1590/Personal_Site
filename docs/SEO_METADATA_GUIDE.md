# SEO Metadata Management Guide

## Overview

This guide explains how to manage and update SEO metadata (meta tags, Open Graph tags, Twitter Cards, and structured data) in this Angular application.

## Architecture

The application uses a centralized `SeoService` located at `src/app/services/seo.service.ts` to manage all SEO-related metadata dynamically.

### Key Features

- **Dynamic Meta Tags**: Title, description, keywords, and author tags
- **Open Graph Tags**: For rich social media previews (Facebook, LinkedIn)
- **Twitter Card Tags**: For enhanced Twitter sharing
- **Canonical URLs**: Automatic canonical URL management via `CanonicalService`
- **JSON-LD Structured Data**: Person and WebSite schemas for better search engine understanding

## How It Works

### 1. Global Metadata

Global default metadata is initialized in `app.component.ts` using:

```typescript
this.seoService.initializeDefaultMetadata();
```

This sets up:
- Default title, description, and keywords
- Robots meta tag
- Base Open Graph and Twitter Card tags

### 2. Page-Specific Metadata

Each page component should update its metadata in the `ngOnInit()` lifecycle hook:

```typescript
import { SeoService } from 'src/app/services/seo.service';

export class YourComponent implements OnInit {
  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.updateSeoMetadata();
  }

  private updateSeoMetadata(): void {
    this.seoService.updateMetadata({
      title: 'Your Page Title',
      description: 'Your page description for search engines and social media',
      keywords: 'keyword1, keyword2, keyword3',
      image: 'https://yoursite.com/path/to/social-image.png', // Optional
      type: 'website', // or 'article', 'profile', etc.
      author: 'Author Name' // Optional
    });
  }
}
```

## Adding Metadata to New Pages

### Step 1: Import the SeoService

```typescript
import { SeoService } from 'src/app/services/seo.service';
```

### Step 2: Inject in Constructor

```typescript
constructor(private seoService: SeoService) { }
```

### Step 3: Implement OnInit and Update Metadata

```typescript
ngOnInit(): void {
  this.updateSeoMetadata();
  // Your other initialization code...
}

private updateSeoMetadata(): void {
  this.seoService.updateMetadata({
    title: 'New Page Title - Lucas Brito',
    description: 'Compelling description that will appear in search results',
    keywords: 'relevant, keywords, for, this, page',
    type: 'website' // or 'article', 'profile', etc.
  });
}
```

## Metadata Fields

### Required Fields
- **title**: The page title (appears in browser tab and search results)
- **description**: Brief description for search engines and social media (150-160 characters recommended)

### Optional Fields
- **keywords**: Comma-separated list of relevant keywords
- **image**: Full URL to an image for social media sharing (recommended size: 1200x630px)
- **type**: Open Graph type (website, article, profile, etc.)
- **author**: Page author name

## Best Practices

### Title Tags
- Keep titles under 60 characters
- Include primary keywords near the beginning
- Make each title unique
- Follow pattern: "Primary Keyword - Secondary Keyword | Brand"

### Description Tags
- Keep between 150-160 characters
- Include a clear call-to-action
- Make it compelling and accurate
- Include target keywords naturally

### Keywords
- Focus on 5-10 relevant keywords per page
- Use long-tail keywords
- Don't keyword stuff

### Images for Social Sharing
- Use high-quality images
- Recommended size: 1200x630px (16:9 aspect ratio)
- Keep file size under 1MB
- Use descriptive filenames
- Ensure images are publicly accessible

## Open Graph Tags

Open Graph tags are automatically managed by the `SeoService`. They include:

- `og:title` - The title of your page
- `og:description` - Description of the page
- `og:image` - Image URL for social sharing
- `og:url` - Canonical URL of the page
- `og:type` - Type of content (website, article, etc.)
- `og:site_name` - Name of the overall site
- `og:locale` - Locale of the content

## Twitter Card Tags

Twitter Card tags are also automatically managed:

- `twitter:card` - Type of card (summary_large_image)
- `twitter:site` - @username of website
- `twitter:creator` - @username of content creator
- `twitter:title` - Title of content
- `twitter:description` - Description of content
- `twitter:image` - Image URL for sharing

## Structured Data (JSON-LD)

The site uses JSON-LD structured data in `src/index.html`:

### Person Schema
Describes the site owner with professional information:
- Name
- Job title
- Social media profiles
- Skills and expertise

### WebSite Schema
Describes the website itself:
- Name and URL
- Description
- Search functionality

### Adding New Structured Data

To add page-specific structured data, you can use Angular's built-in methods in your component:

```typescript
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';

constructor(@Inject(DOCUMENT) private document: Document) { }

ngOnInit(): void {
  this.addStructuredData();
}

private addStructuredData(): void {
  const script = this.document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article Title",
    "datePublished": "2025-01-01",
    "author": {
      "@type": "Person",
      "name": "Lucas de Brito Silva"
    }
  });
  this.document.head.appendChild(script);
}
```

## Canonical URLs

Canonical URLs are automatically managed by the `CanonicalService` and updated on every route change. No additional action is needed in component code.

## Robots.txt and Sitemap.xml

### robots.txt
Located at `src/robots.txt`. Update to:
- Allow/disallow specific paths
- Add crawl delays if needed
- Reference sitemap location

### sitemap.xml
Located at `src/sitemap.xml`. Update when:
- Adding new routes
- Changing page priorities
- Updating change frequencies

Format:
```xml
<url>
  <loc>https://lucasbrito.com.br/new-page</loc>
  <lastmod>2025-11-17</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

## Testing Your Metadata

### Tools for Validation

1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/
4. **Google Rich Results Test**: https://search.google.com/test/rich-results
5. **Schema Markup Validator**: https://validator.schema.org/

### Manual Testing

1. Build the application: `npm run build`
2. Serve the built application
3. View page source and verify meta tags are present
4. Use browser dev tools to inspect `<head>` section
5. Test social sharing on different platforms

### Lighthouse SEO Audit

Run Google Lighthouse in Chrome DevTools:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "SEO" category
4. Click "Generate report"
5. Aim for a score of 90+

## Common Issues

### Meta Tags Not Updating

If meta tags aren't updating between routes:
- Ensure `SeoService` is injected in the component
- Verify `updateMetadata()` is called in `ngOnInit()`
- Check browser console for errors

### Social Media Previews Not Showing

If social media platforms don't show previews:
- Verify image URLs are absolute and publicly accessible
- Clear social media cache using platform debugging tools
- Check that Open Graph tags are using `property` attribute (not `name`)
- Ensure image meets size requirements (min 200x200px)

### Duplicate Meta Tags

The `SeoService` uses `updateTag()` which prevents duplicates by updating existing tags rather than creating new ones.

## Example: Complete Component Implementation

```typescript
import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css'],
  standalone: false
})
export class MyPageComponent implements OnInit {

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.updateSeoMetadata();
    // Other initialization code...
  }

  private updateSeoMetadata(): void {
    this.seoService.updateMetadata({
      title: 'My Page Title - Lucas Brito',
      description: 'This is a compelling description of my page that will appear in search results and social media shares.',
      keywords: 'my page, lucas brito, keywords, relevant terms',
      image: 'https://lucasbrito.com.br/assets/img/my-page-image.png',
      type: 'article',
      author: 'Lucas de Brito Silva'
    });
  }
}
```

## Maintenance Checklist

- [ ] Update sitemap.xml when adding new routes
- [ ] Test social sharing after content updates
- [ ] Run Lighthouse SEO audit quarterly
- [ ] Review and update meta descriptions annually
- [ ] Monitor search console for issues
- [ ] Validate structured data after schema changes
- [ ] Check canonical URLs are resolving correctly
- [ ] Ensure all images have alt text

## Resources

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
- [Angular Meta Service](https://angular.io/api/platform-browser/Meta)

## Support

For questions or issues related to SEO metadata management, please refer to:
- Angular Meta and Title services documentation
- The `SeoService` implementation in `src/app/services/seo.service.ts`
- This guide

---

**Last Updated**: November 17, 2025
**Version**: 1.0.0
