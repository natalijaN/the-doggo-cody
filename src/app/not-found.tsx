import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <p className="text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
