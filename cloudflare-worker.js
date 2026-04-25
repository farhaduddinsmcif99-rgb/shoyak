/**
 * Cloudflare Worker for Shoyakai
 * Provides routes for robots.txt, sitemap.xml, and handles SPA routing.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const domain = "shoyakai.2com.workers.dev";

    // 1. Handle robots.txt
    if (path === "/robots.txt") {
      const robots = `User-agent: *
Allow: /
Disallow: /profile/
Disallow: /alerts/
Disallow: /assistant/
Disallow: /tools/

Sitemap: https://${domain}/sitemap.xml`;

      return new Response(robots, {
        headers: { 
          "content-type": "text/plain; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Robots-Tag": "index, follow"
        },
      });
    }

    // 2. Handle sitemap.xml
    if (path === "/sitemap.xml") {
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://${domain}/</loc><lastmod>2026-04-24</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>
  <url><loc>https://${domain}/tools-list</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://${domain}/blog</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://${domain}/about</loc><lastmod>2026-04-24</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
  <url><loc>https://${domain}/tools/article-writer</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://${domain}/tools/yt-script</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://${domain}/tools/seo-keywords</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://${domain}/tools/resume-builder</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://${domain}/tools/business-plan</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://${domain}/tools/coding-assistant</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://${domain}/tools/ssc-hsc-helper</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://${domain}/tools/tin-reg</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://${domain}/tools/scholarship-search</loc><lastmod>2026-04-24</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
</urlset>`;

      return new Response(sitemap, {
        headers: { 
          "content-type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
          "X-Robots-Tag": "index, follow"
        },
      });
    }

    // 3. Fallback to serve the SPA
    try {
      const asset = await env.ASSETS.fetch(request);
      
      if (asset.status === 200 || asset.status === 304) {
        return asset;
      }
      
      const indexHtml = await env.ASSETS.fetch(new Request(url.origin + "/index.html"));
      return new Response(indexHtml.body, {
        ...indexHtml,
        headers: {
          ...indexHtml.headers,
          "content-type": "text/html; charset=utf-8",
          "X-Robots-Tag": "index, follow"
        }
      });
    } catch (e) {
      return new Response("Shoyakai Server Error", { status: 500 });
    }
  },
};
