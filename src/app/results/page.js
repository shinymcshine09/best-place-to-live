'use client'

import dynamic from 'next/dynamic'

const ClientResults = dynamic(() => import('./components/getResults.js'), { ssr: false });

export default function ResultsPage() {
  return (
    <main className="p-8 background-results">
      <ClientResults />
    </main>
  );
}