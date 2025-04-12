// app/posts/[slug]/page.tsx

import { useParams, useSearchParams } from 'next/navigation';

const PostPage = () => {
  const { slug } = useParams();  // Dynamischer Teil der URL (z. B. "/posts/my-article")
  const searchParams = useSearchParams();  // Query-Parameter (z. B. "?user=someuser")

  const user = searchParams.get('user'); // Hole den "user" Query-Parameter
  return <h1>Post: {slug}, User: {user}</h1>;
};

export default PostPage;
