"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const NewsletterStrip = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    // TODO wire to a real /newsletter endpoint when one exists
    setSubmitted(true);
    setEmail("");
    toast.success("You're on the list! Check your inbox for the welcome code.");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 ring-1 ring-orange-100/60 px-6 py-10 md:px-12 md:py-14"
        >
          <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="space-y-3 max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-orange-700 ring-1 ring-orange-100">
                <Mail size={11} />
                Newsletter
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 leading-tight">
                Get 10% off your first order.
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Drop your email — we&apos;ll send you a welcome code plus
                first-look access to seasonal drops.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full lg:w-[420px] items-center gap-2 rounded-full bg-white ring-1 ring-orange-100 shadow-sm p-1.5"
            >
              <div className="flex-1 flex items-center gap-2 px-3">
                <Mail size={16} className="text-orange-400 flex-shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent border-0 outline-none text-sm placeholder:text-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 hover:bg-orange-500 text-white text-sm font-medium px-5 py-2.5 transition disabled:opacity-70"
              >
                {submitted ? (
                  <>
                    <Check size={14} />
                    Subscribed
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterStrip;
