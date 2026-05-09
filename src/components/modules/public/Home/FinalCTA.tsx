import Link from "next/link";

const FinalCTA = () => {
  return (
    <section className="py-16 bg-gray-900 text-white mb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-white text-opacity-90 mb-8">
            Explore our wide range of products and find exactly what you&apos;re
            looking for.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-3 bg-white text-orange-600 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
