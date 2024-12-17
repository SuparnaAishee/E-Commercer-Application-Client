/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from "next/image";

export default function PromoSection() {
  return (
    <section className="py-6 md:py-8 md:ml-12 md:mr-12">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
        {/* Left Section: TV Promotion */}
        <div className="col-span-2 bg-gray-200 p-4 md:p-8 rounded-lg shadow flex flex-col">
          {/* Text Content */}
          <div className="pr-0 md:pr-48 pt-4 md:pt-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 ml-2 md:ml-8">
              Cutting-Edge Electronics for Your Modern Lifestyle
            </h2>
            <p className="text-gray-600 mb-3 text-sm w-full md:w-3/4 ml-2 md:ml-8">
              Discover a world of innovation with our latest range of gadgets,
              designed to make life smarter, faster, and more connected.
            </p>
            <p className="text-gray-800 font-semibold text-base ml-2 md:ml-8">
              STARTING AT{" "}
              <span className="text-orange-500 text-lg font-bold">$49.99</span>
            </p>
            <button className="mt-2 bg-orange-400 text-gray-800 px-3 py-1.5 rounded hover:bg-orange-500 text-sm ml-2 md:ml-8">
              Shop now →
            </button>
          </div>
          {/* TV Image */}
          <div className="mt-4 md:mt-6">
            <Image
              src="https://res.cloudinary.com/dwelabpll/image/upload/v1734184707/sale-ad-sale-with-laptop-headphones_913495-5603_vjp4vg.jpg"
              alt="TV Promotion"
              width={700}
              height={200}
              className="rounded-lg mx-auto md:ml-16"
            />
          </div>
        </div>

        {/* Right Section: Two Stacked Ads */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Top Ad */}
          <div className="bg-orange-400 p-4 md:p-6 rounded-lg shadow">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 ml-2 md:ml-12">
              Best Quality HeadPhone
            </h3>
            <button className="bg-black text-white px-4 py-2 ml-2 md:ml-12 rounded hover:opacity-80 text-sm">
              Shop now
            </button>
            <div className="mt-4">
              <Image
                src="https://res.cloudinary.com/dwelabpll/image/upload/v1734172500/product-social-media-promotional-poster_494606-69_wknafy.jpg"
                alt="Lather Bags"
                width={250}
                height={50}
                className="rounded mx-auto md:ml-12"
              />
            </div>
          </div>
          {/* Bottom Ad */}
          <div className="bg-gray-200 p-4 md:p-6 rounded-lg shadow">
            <h3 className="text-base md:text-lg font-semibold text-orange-500 mb-2 ml-2 md:ml-4">
              Home Appliances Deal
            </h3>
            <a
              href="#"
              className="text-gray-800 font-medium underline hover:text-orange-500 ml-2 md:ml-4"
            >
              Explore
            </a>
            <div className="mt-4">
              <Image
                src="https://res.cloudinary.com/dwelabpll/image/upload/v1734171711/home-appliance-facebook-shared-post-banner-design-template-12c4f5a6990605a7001006fd63086b9b_screen_rkp5dx.jpg"
                alt="Juice Maker"
                width={300}
                height={150}
                className="rounded mx-auto md:ml-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
