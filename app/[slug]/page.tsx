// pages/[slug].tsx
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { slug } = router.query;  // slug ist der Parameter in der URL

  return (
    <div>
      <h1>Artikel: {slug}</h1>
    </div>
  );
};

export default Page;
