import { promises as fs } from 'fs';
import path from 'path';

const baseUrl = 'https://site-production-52fb.up.railway.app';

async function getSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });

  return entries
    .filter((entry) => entry.isFile() && entry.name === 'page.mdx')
    .map((entry) => {
      const relativePath = path.relative(
        dir,
        path.join(entry.parentPath, entry.name)
      );
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, '/'));
}

export default async function sitemap() {
  const rantingsDirectory = path.join(process.cwd(), 'app', 'rantings');
  const slugs = await getSlugs(rantingsDirectory);

  const rantings = slugs.map((slug) => ({
    url: `${baseUrl}/rantings/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', '/resume', '/hacks', '/photos'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...rantings];
}
