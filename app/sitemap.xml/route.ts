import { getAllEntries, getBlogListRes } from '../../helper';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_HOSTED_URL || 'http://localhost:3000';

    let pages = await getAllEntries();
    let posts = await getBlogListRes();

    const allPages = pages.map((page) => `${baseUrl}${page.url}`);
    const allPosts = posts.map((post) => `${baseUrl}${post.url}`);
    const siteMapList = [...allPages, ...allPosts].sort();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${siteMapList
        .map((url) => {
          return `
          <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'max-age=0, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}