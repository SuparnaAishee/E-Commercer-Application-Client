"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

type HeroSlide = {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  price: number;
  image: string;
  accent: string;
};

const SLIDES: HeroSlide[] = [
  {
    id: 1,
    eyebrow: "Power meets innovation",
    title: "Apple MacBook Pro M3",
    description:
      "Ultra-fast performance with the latest M3 chip, Liquid Retina XDR display, and all-day battery life.",
    price: 499,
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1742070134/1883634_3-removebg-preview_qnvgny.png",
    accent: "from-orange-50 via-amber-50 to-rose-50",
  },
  {
    id: 2,
    eyebrow: "Unparalleled sound",
    title: "Sony WH-1000XM5",
    description:
      "Industry-leading noise cancellation with crystal-clear audio and up to 30 hours of battery life.",
    price: 79,
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1742070162/360-RA-category-icon-20221202_f8g9wj.png",
    accent: "from-orange-50 via-amber-50 to-rose-50",
  },
  {
    id: 3,
    eyebrow: "Cook like a pro",
    title: "Ninja Foodi Smart Grill",
    description:
      "Grill, air fry, roast, and bake — all in one with smart temperature control.",
    price: 99,
    image:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1742070616/ninja-foodi-max-health-grill-and-air-fryer-grey-and-silver-or-ag551uk-did-electrical-2_ed7fe3b4-c9bc-4b8a-b3bf-6e822612e1c6_600x_nnlt80-removebg-preview_avsuia.png",
    accent: "from-orange-50 via-amber-50 to-rose-50",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (i: number) =>
    setCurrentSlide((i + SLIDES.length) % SLIDES.length);
  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="w-full px-4 md:px-6 lg:px-8 py-8 md:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 lg:gap-6">
          <div className="relative h-[340px] sm:h-[400px] md:h-[460px] lg:h-[480px] w-full overflow-hidden rounded-3xl ring-1 ring-orange-100/60 shadow-[0_24px_60px_-30px_rgba(255,165,0,0.45)]">
            {SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                aria-hidden={index !== currentSlide}
                className={`absolute inset-0 transition-opacity duration-700 ease-out bg-gradient-to-br ${slide.accent} ${
                  index === currentSlide
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
                <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />

                <div className="relative grid h-full grid-cols-1 md:grid-cols-2 items-center gap-6 p-6 sm:p-8 md:p-12">
                  <div className="space-y-4 md:space-y-5 max-w-md">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-xs font-medium tracking-wide text-orange-700 ring-1 ring-orange-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                      {slide.eyebrow}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 leading-[1.1]">
                      {slide.title}
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 hidden sm:block leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Link
                        href="/products"
                        className="group inline-flex items-center gap-1.5 rounded-full bg-gray-900 hover:bg-gray-800 px-5 py-2.5 text-sm font-medium text-white transition-all"
                      >
                        Shop Now
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </Link>
                      <span className="inline-flex items-baseline gap-1 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-orange-500/30">
                        <span className="text-xs font-medium opacity-80">
                          From
                        </span>
                        ${slide.price}
                      </span>
                    </div>
                  </div>

                  <div className="relative h-full flex items-center justify-center">
                    <div className="absolute inset-x-8 inset-y-6 rounded-3xl bg-white/40 backdrop-blur-sm" />
                    <div className="relative h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-72 lg:w-72">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-contain drop-shadow-xl"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur p-2 text-gray-700 shadow-md ring-1 ring-gray-200 hover:bg-white transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur p-2 text-gray-700 shadow-md ring-1 ring-gray-200 hover:bg-white transition"
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 flex items-center gap-2">
              {SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentSlide === index
                      ? "w-8 bg-orange-500"
                      : "w-2 bg-orange-200 hover:bg-orange-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <PromoTile
              eyebrow="Summer sells"
              title="Phillips Mixer Grinder"
              cta="Shop Now"
              ctaHref="/products?category=home-kitchen"
              image="https://pngfre.com/wp-content/uploads/Mixer-Grinder-2.png"
              variant="warm"
            />
            <PromoTile
              eyebrow="Glow this season"
              title="Affordable Beauty Picks"
              cta="Shop Now"
              ctaHref="/products?category=beauty"
              image="https://png.pngtree.com/png-clipart/20250106/original/pngtree-cosmetics-beauty-products-mockup-png-image_19401775.png"
              variant="cool"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type PromoTileProps = {
  eyebrow: string;
  title: string;
  cta: string;
  ctaHref: string;
  image: string;
  variant: "warm" | "cool";
};

const PromoTile = ({
  eyebrow,
  title,
  cta,
  ctaHref,
  image,
  variant,
}: PromoTileProps) => {
  const surface =
    variant === "warm"
      ? "bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500 text-white"
      : "bg-gradient-to-br from-gray-50 via-white to-orange-50 text-gray-900 ring-1 ring-orange-100/70";

  const ctaSurface =
    variant === "warm"
      ? "bg-white text-orange-600 hover:bg-orange-50"
      : "bg-orange-500 text-white hover:bg-orange-600";

  const eyebrowSurface =
    variant === "warm"
      ? "bg-white/20 text-white"
      : "bg-orange-100 text-orange-700";

  return (
    <div
      className={`group relative h-[230px] sm:h-[230px] overflow-hidden rounded-3xl shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)] ${surface}`}
    >
      <div className="relative z-10 flex h-full items-center justify-between p-6">
        <div className="space-y-3 max-w-[60%]">
          <span
            className={`inline-flex items-center rounded-full ${eyebrowSurface} px-2.5 py-1 text-[11px] font-medium tracking-wide`}
          >
            {eyebrow}
          </span>
          <h3 className="text-lg sm:text-xl font-semibold leading-snug">
            {title}
          </h3>
          <Link
            href={ctaHref}
            className={`group/btn inline-flex items-center gap-1 rounded-full ${ctaSurface} px-4 py-2 text-xs font-medium transition`}
          >
            {cta}
            <ArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-0.5"
            />
          </Link>
        </div>
        <div className="relative h-32 w-32 sm:h-40 sm:w-40 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};
