// app/not-found.tsx

export default function NotFound() {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-8xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">
          This Page does not exist!
        </p>
        <a href="/" className="text-blue-500 hover:underline">
          Back to the Homepage!
        </a>
      </div>
    );
}
