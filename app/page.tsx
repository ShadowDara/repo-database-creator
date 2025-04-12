// app/page.tsx
//
// Homepage - Repo Database Creator

import Image from "next/image";

export const metadata = {
  title: "Repo Database Creator! - Home",
  description: "for creating a list for public repositorys!",
};

export default function Home() {
  return (
    <div>
      <head>
        <meta httpEquiv="refresh" content="10;url=https://github.com/ShadowDara/repo-database-creator"></meta>
      </head>
      <div className="h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Repository Database Creator</h1>
        <p className="text-lg mb-6">
          You will be directed to the Github Repository immediatly!
        </p>
        <a href="/" className="text-blue-500 hover:underline">
          Please click here if this does not work!
        </a>
      </div>
    </div>
  );
}
