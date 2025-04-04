// app/hacks/page.tsx
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

type HackMeta = {
  title: string;
  summary: string;
  slug: string;
};

export default async function HacksPage() {
  const hacksDir = path.join(process.cwd(), 'app', 'hacks');
  const entries = await fs.readdir(hacksDir, { withFileTypes: true });

  const hacks: HackMeta[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const mdxPath = path.join(hacksDir, entry.name, 'page.mdx');
      try {
        const file = await fs.readFile(mdxPath, 'utf8');
        const { data } = matter(file);
        hacks.push({
          title: data.title || entry.name,
          summary: data.summary || '',
          slug: entry.name,
        });
      } catch {
        continue;
      }
    }
  }

  return (
    <div style={{ fontFamily: 'Courier New', color: '#00FF00', padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem' }}>Hacking / Experiments</h1>
      <p>Terminal logs from the digital underworld.</p>

      <ul style={{ marginTop: '2rem' }}>
        {hacks.map((hack) => (
          <li key={hack.slug} style={{ marginBottom: '1.5rem' }}>
            <Link href={`/hacks/${hack.slug}`}>
              <h2 style={{ color: '#00FF00', fontSize: '1.2rem', textDecoration: 'underline' }}>
                {hack.title}
              </h2>
            </Link>
            <p style={{ maxWidth: '600px' }}>{hack.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
