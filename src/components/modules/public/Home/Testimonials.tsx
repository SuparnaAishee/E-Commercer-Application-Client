"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useGetAllProducts } from "@/src/hooks/product";

type Testimonial = {
  id: string;
  rating: number;
  comment: string;
  authorName: string;
  productName: string;
};

const Testimonials = () => {
  const { data: products } = useGetAllProducts([
    { name: "limit", value: 50 },
  ]);
  const [active, setActive] = useState(0);

  const testimonials = useMemo<Testimonial[]>(() => {
    const reviews: Testimonial[] = [];
    products?.data?.forEach((product) => {
      product.reviews?.forEach((review) => {
        if (review.rating >= 4 && review.comment?.trim()) {
          reviews.push({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            authorName: review.user?.name ?? "Anonymous shopper",
            productName: product.name,
          });
        }
      });
    });
    // Deduplicate similar comments to keep variety
    const seen = new Set<string>();
    const unique = reviews.filter((r) => {
      const key = r.comment.slice(0, 30);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    return unique.slice(0, 6);
  }, [products]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const id = setInterval(
      () => setActive((p) => (p + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[active];

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-white via-orange-50/30 to-white">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-700 text-[11px] font-medium tracking-wider uppercase px-3 py-1">
            Customer love
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
            What shoppers are saying
          </h2>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-xl">
            Real reviews from real customers across the catalog.
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="relative bg-white rounded-3xl ring-1 ring-orange-100/70 px-6 py-10 md:px-12 md:py-14 shadow-[0_30px_60px_-30px_rgba(255,140,0,0.2)]">
            <Quote
              className="absolute top-6 left-6 text-orange-200"
              size={32}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-5 text-center"
              >
                <div className="flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      className={
                        star <= current.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                  &ldquo;{current.comment}&rdquo;
                </p>
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-gray-900">
                    {current.authorName}
                  </p>
                  <p className="text-xs text-gray-500">
                    Bought {current.productName}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() =>
                setActive(
                  (p) => (p - 1 + testimonials.length) % testimonials.length,
                )
              }
              aria-label="Previous testimonial"
              className="absolute left-4 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-white ring-1 ring-gray-100 hover:ring-orange-200 hover:bg-orange-50 transition shadow-sm"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % testimonials.length)}
              aria-label="Next testimonial"
              className="absolute right-4 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-white ring-1 ring-gray-100 hover:ring-orange-200 hover:bg-orange-50 transition shadow-sm"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? "w-8 bg-orange-500"
                    : "w-2 bg-orange-200 hover:bg-orange-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
