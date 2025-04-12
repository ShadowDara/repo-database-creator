// app/[slug]/page.tsx

"use client";  // Diese Direktive markiert die Datei als Client-Komponente

import { useParams } from 'next/navigation';  // Importiere aus 'next/navigation'

const Page = () => {
  const { slug } = useParams();  // Hol dir den slug-Parameter

  return (
    <div>
      <h1>Artikel: {slug}</h1>
    </div>
  );
};

export default Page;
