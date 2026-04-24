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
  image = 'https://api.dicebear.com/7.x/bottts/svg?seed=Shayok', 
  url = 'https://shayok.ai/' 
}: SEOProps) {
  const fullTitle = title ? `${title} | Shayok.AI` : 'Shayok.AI | Your Personal Life-OS Companion';
  const fullDescription = description || 'Futuristic Digital Guardian for Bangladesh. Empowering farmers, students, and entrepreneurs with AI.';
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}

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
    </Helmet>
  );
}
