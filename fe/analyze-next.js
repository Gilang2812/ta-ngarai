// analyze-next.js
import { globby } from 'globby';
import fs from 'fs/promises';

const clientIndicators = ['use client', 'useEffect', 'fetch'];
const serverIndicators = [
  'getServerSideProps',
  'getStaticProps',
  'generateMetadata',
  'generateStaticParams'
];

function analyzeFile(content) {
  const results = {
    isClient: clientIndicators.some(keyword => content.includes(keyword)),
    isServer: serverIndicators.some(keyword => content.includes(keyword)),
  };
  if (results.isClient && results.isServer) {
    results.type = 'Hybrid';
  } else if (results.isClient) {
    results.type = 'SPA';
  } else if (results.isServer) {
    results.type = 'MPA';
  } else {
    results.type = 'Unknown';
  }
  return results;
}

async function run() {
  const files = await globby(['src/app/**/*.{tsx,ts}', 'src/pages/**/*.{tsx,ts}']);
  if (files.length === 0) {
    console.log('❌ Tidak ditemukan file di folder `app/` atau `pages/`');
    return;
  }

  console.log('📊 Analisis File Next.js:\n');
  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    const result = analyzeFile(content);
    console.log(`- ${file} → ${result.type}`);
  }
}

run();
