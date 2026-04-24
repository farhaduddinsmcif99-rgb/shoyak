import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title, 
  description, 
  keywords, 
  image = 'https://api.dicebear.com/7.x/bottts/svg?seed=Shoyakai', 
  url = 'https://shoyakai.farhaduddinsmcif99.workers.dev/' 
}: SEOProps) {
  const fullTitle = title ? `${title} | Shoyakai` : 'Shoyakai – Free Online Tools & Simple Web Apps';
  const fullDescription = description || 'Shoyakai offers free online tools and simple web apps to help you work faster, smarter, and easier.';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Shoyakai",
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
      "name": "Shoyakai Labs"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2480"
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />

      {/* ItemProp for Google Discovery */}
      <meta itemprop="name" content={fullTitle} />
      <meta itemprop="description" content={fullDescription} />
      <meta itemprop="image" content={image} />

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
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
