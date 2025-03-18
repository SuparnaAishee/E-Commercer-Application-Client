import Link from "next/link";

export default function ShopNotFound() {
  return (
    <div className="container pt-12 pl-12 pr-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Shop Not Found</h1>
      <p className="text-lg mb-8">
        The shop you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
