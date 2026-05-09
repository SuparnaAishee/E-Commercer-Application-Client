"use client";

import { motion } from "framer-motion";
import { Truck, Headphones, RefreshCw, ShieldCheck } from "lucide-react";

const BENEFITS = [
  {
    title: "Free Shipping",
    subtitle: "On all orders over $50",
    Icon: Truck,
  },
  {
    title: "24/7 Support",
    subtitle: "Reach us anytime",
    Icon: Headphones,
  },
  {
    title: "30-Day Returns",
    subtitle: "Hassle-free guarantee",
    Icon: RefreshCw,
  },
  {
    title: "Secure Payments",
    subtitle: "100% protected checkout",
    Icon: ShieldCheck,
  },
] as const;

const Benefits = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {BENEFITS.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="group flex items-center gap-4 rounded-2xl bg-white ring-1 ring-gray-100 px-5 py-4 hover:ring-orange-200 hover:shadow-[0_20px_40px_-25px_rgba(255,165,0,0.4)] transition-all"
            >
              <div className="flex-shrink-0 grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 group-hover:scale-110 transition-transform">
                <benefit.Icon size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {benefit.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{benefit.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
