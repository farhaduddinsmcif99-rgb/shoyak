import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'WebApplication' | 'Article' | 'SoftwareApplication' | 'WebPage';
  schemaData?: any;
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  image = 'https://api.dicebear.com/7.x/bottts/svg?seed=Shoyakai', 
  url = 'https://shoyakai.2com.workers.dev/',
  type = 'WebApplication',
  schemaData
}: SEOProps) {
  const fullTitle = title ? `${title} | Shoyakai (Shoyaki AI)` : 'Shoyakai – Premium Shoyaki AI Tools & Ecosystem';
  const fullDescription = description || 'Shoyakai (Shoyaki AI) is an all-in-one productivity powerhouse. Access advanced AI companions, visual tools, and professional utilities for free.';
  const fullKeywords = keywords ? `${keywords}, shoyaki ai, shoyakai, ai tools, shoyakai labs` : 'shoyakai, shoyaki ai, ai assistant, productivity ecosystem, professional web tools, ai workspace';
  
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": title || "Shoyakai AI",
    "alternateName": "Shoyaki AI",
    "operatingSystem": "All",
    "applicationCategory": "ProductivityApplication",
    "browserRequirements": "requires HTML5 support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": fullDescription,
    "url": url,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": "Shoyakai Labs",
      "url": "https://shoyakai.2com.workers.dev/"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2480"
    }
  };

  const finalSchema = schemaData ? { "@context": "https://schema.org", ...schemaData } : defaultSchema;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />

      {/* ItemProp for Google Discovery */}
      <meta itemProp="name" content={fullTitle} />
      <meta itemProp="description" content={fullDescription} />
      <meta itemProp="image" content={image} />

      {/* Open Graph / Facebook */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
