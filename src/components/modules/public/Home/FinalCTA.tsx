import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8 mb-10">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gray-900 px-6 py-14 md:px-12 md:py-20 text-center text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.55)]">
          <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-orange-500/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-5">
            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur ring-1 ring-white/20 text-white text-[11px] font-medium tracking-wider uppercase px-3 py-1">
              Ready when you are
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              Find what you love.
              <br />
              <span className="text-white/80">Get it shipped fast.</span>
            </h2>
            <p className="text-base md:text-lg text-white/70">
              Thousands of products across every category, curated by hand-picked vendors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-3">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-white text-gray-900 hover:bg-orange-500 hover:text-white px-6 py-3 text-sm font-medium transition"
              >
                Start shopping
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/support"
                className="inline-flex items-center justify-center rounded-full bg-transparent border border-white/30 text-white hover:bg-white/10 px-6 py-3 text-sm font-medium transition"
              >
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
