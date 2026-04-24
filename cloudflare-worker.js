/**
 * Cloudflare Worker for Shoyakai
 * This script serves robots.txt, sitemap.xml, and the SPA application.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. Handle robots.txt
    if (path === "/robots.txt") {
      const robots = `User-agent: *
Allow: /
Disallow: /profile/
Disallow: /alerts/
Disallow: /assistant/
Disallow: /tools/

Sitemap: https://shoyakai.farhaduddinsmcif99.workers.dev/sitemap.xml`;

      return new Response(robots, {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    // 2. Handle sitemap.xml
    if (path === "/sitemap.xml") {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://shoyakai.farhaduddinsmcif99.workers.dev/</loc>
    <lastmod>2026-04-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://shoyakai.farhaduddinsmcif99.workers.dev/tools-list</loc>
    <lastmod>2026-04-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://shoyakai.farhaduddinsmcif99.workers.dev/blog</loc>
    <lastmod>2026-04-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://shoyakai.farhaduddinsmcif99.workers.dev/about</loc>
    <lastmod>2026-04-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://shoyakai.farhaduddinsmcif99.workers.dev/tools/article-writer</loc>
    <lastmod>2026-04-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://shoyakai.farhaduddinsmcif99.workers.dev/tools/yt-script</loc>
    <lastmod>2026-04-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

      return new Response(sitemap, {
        headers: { "content-type": "application/xml; charset=utf-8" },
      });
    }

    // 3. Fallback to serve the SPA
    // In a real env, you'd pull this from KV or fetch from a static asset bucket.
    // For this demonstration, we assume the worker is configured with a static asset handler.
    // If you're using Cloudflare Pages, this logic is often built-in.
    
    // If you are using a standard worker to serve static files:
    try {
      // This is a placeholder for your static asset fetching logic
      // e.g., return env.ASSETS.fetch(request);
      return await env.ASSETS.fetch(request);
    } catch (e) {
      // If asset not found, serve index.html (SPA routing)
      return await env.ASSETS.fetch(new Request(url.origin + "/index.html"));
    }
  },
};
