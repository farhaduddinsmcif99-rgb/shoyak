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
  image = 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?q=80&w=1200&auto=format&fit=crop', 
  url = 'https://shayok.ai/',
  type = 'WebApplication',
  schemaData
}: SEOProps) {
  const fullTitle = title ? `${title} | Shayok.AI (শায়ক এআই)` : 'Shayok.AI – আপনার পাশে, সবসময় | Smart AI Assistant Bangladesh';
  const fullDescription = description || 'Shayok.AI is the smartest agricultural and productivity ecosystem in Bangladesh. Get Krishi AI help, scam protection, and 100+ AI tools for free.';
  const fullKeywords = keywords ? `${keywords}, shayok ai, shoyakai, krishi ai, bangla ai, agricultural tools, scam check bangladesh` : 'shayok ai, krishi ai, bangla ai, agriculture assistant, ssc helper, scam check bangladesh, productivity tools, shoyakai';
  
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": title || "Shayok.AI",
    "alternateName": "শায়ক এআই",
    "operatingSystem": "All",
    "applicationCategory": "ProductivityApplication",
    "browserRequirements": "requires HTML5 support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BDT"
    },
    "description": fullDescription,
    "url": url,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": "Shayok.AI Labs",
      "url": "https://shayok.ai/"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "2500"
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
