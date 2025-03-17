"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutUsPage() {
  const [activeTab, setActiveTab] = useState("quality");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({ title: "", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToastNotification(
      "Message sent!",
      "We'll get back to you as soon as possible."
    );
    setFormData({ name: "", email: "", message: "" });
  };

  const showToastNotification = (title: string, message: string) => {
    setToastMessage({ title, message });
    setShowToast(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Loyal Customer",
      image:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1740226222/images_gil5x7.jpg",
      content:
        "I've been shopping here for years and the quality never disappoints. Their customer service is exceptional!",
    },
    {
      name: "Michael Chen",
      role: "First-time Buyer",
      image:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1740226214/portrait-of-smiling-male-owner-of-fashion-store-standing-in-front-of-clothing-display_ttj1zu.jpg",
      content:
        "As a first-time customer, I was blown away by the attention to detail and the speed of delivery. Will definitely shop again!",
    },
    {
      name: "Emma Rodriguez",
      role: "Regular Shopper",
      image:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1740226235/happy-indian-woman-look-at-webcam-doing-job-interview-videochat_zbcmnl.jpg",
      content:
        "The product range is incredible and the website makes finding exactly what I need so easy. My go-to online store!",
    },
  ];

  const teamMembers = [
    {
      name: "Alex Morgan",
      role: "Founder & CEO",
      image:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1741893582/portrait-young-investor-banker-workplace-260nw-2364566447_pl4b4z-1741893582629.jpg",
      bio: "Alex founded our company with a vision to provide quality products with exceptional service.",
    },
    {
      name: "Jamie Taylor",
      role: "Creative Director",
      image:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1740226096/headshot-with-client-testimonial_t4r8em.jpg",
      bio: "Jamie brings creative vision and design expertise to our product selection and brand identity.",
    },
    {
      name: "Sam Wilson",
      role: "Customer Experience Lead",
      image:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1739988194/premium_photo-1689568126014-06fea9d5d341_l0quzn.jpg",
      bio: "Sam ensures every customer interaction exceeds expectations and builds lasting relationships.",
    },
    {
      name: "Jordan Lee",
      role: "Operations Manager",
      image:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1739988142/expressive-bearded-man-wearing-shirt_273609-5894_kp03dx.jpg",
      bio: "Jordan oversees our logistics and ensures smooth operations from warehouse to delivery.",
    },
  ];

  const milestones = [
    {
      year: "2015",
      title: "Our Beginning",
      description: "Started as a small online store with just 10 products.",
    },
    {
      year: "2017",
      title: "Expansion",
      description:
        "Expanded our product range and moved to a larger warehouse.",
    },
    {
      year: "2019",
      title: "Going International",
      description: "Started shipping to international customers.",
    },
    {
      year: "2021",
      title: "Sustainability Focus",
      description:
        "Implemented eco-friendly packaging and carbon-neutral shipping.",
    },
    {
      year: "2023",
      title: "Today",
      description:
        "Serving thousands of happy customers worldwide with over 500 products.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 max-w-md bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-300 transform translate-y-0 opacity-100">
          <div className="flex p-4">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {toastMessage.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {toastMessage.message}
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full py-20 bg-gradient-to-r from-orange-50 to-amber-50 pl-6 pr-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                Our Story
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                We're on a mission to make shopping better
              </h1>
              <p className="text-gray-600 md:text-xl">
                Founded with passion and purpose, we've grown from a small idea
                to a trusted brand that puts customers first.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Explore Our Products
                  <svg
                    className="ml-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden">
              <Image
                src="https://www.vocso.com/blog/wp-content/uploads/2022/02/eCommerce-Website-Features-1920-x-1080.jpg"
                alt="Our team at work"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                Our Values
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                What drives us every day
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our core values shape everything we do, from product selection
                to customer service.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <motion.div
              className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-orange-100 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Customer First
              </h3>
              <p className="text-center text-gray-600">
                We put our customers at the heart of everything we do, ensuring
                exceptional experiences.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-orange-100 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Sustainability
              </h3>
              <p className="text-center text-gray-600">
                We're committed to reducing our environmental impact through
                responsible practices.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col items-center space-y-4 rounded-lg border border-gray-200 p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-orange-100 p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Community</h3>
              <p className="text-center text-gray-600">
                We believe in building strong relationships with our customers
                and partners.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                Our Journey
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                How we've grown
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From humble beginnings to where we are today, our journey has
                been incredible.
              </p>
            </div>
          </div>
          <div className="relative mx-auto max-w-3xl mt-12">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-0.5 -translate-x-1/2 bg-gray-200" />

            {/* Timeline items */}
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative mb-12 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`flex items-center ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                >
                  {/* Content */}
                  <div
                    className={`w-1/2 px-4 ${index % 2 === 0 ? "text-right" : "text-left"}`}
                  >
                    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-900">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Year bubble */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="rounded-full bg-orange-600 text-white h-10 w-10 flex items-center justify-center z-10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Year */}
                  <div
                    className={`w-1/2 px-4 ${index % 2 === 0 ? "text-left" : "text-right"}`}
                  >
                    <span className="text-xl font-bold text-orange-600">
                      {milestone.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                Our Team
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Meet the people behind our success
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our dedicated team works tirelessly to bring you the best
                products and experiences.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 text-white">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm text-white/80">{member.role}</p>
                  <p className="text-xs mt-2">{member.bio}</p>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                Why Choose Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                What sets us apart
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover the unique advantages that make us the preferred choice
                for our customers.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl mt-12">
            {/* Custom Tabs */}
            <div className="w-full">
              <div className="grid w-full grid-cols-3 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab("quality")}
                  className={`py-2 text-sm font-medium ${
                    activeTab === "quality"
                      ? "border-b-2 border-orange-600 text-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Quality
                </button>
                <button
                  onClick={() => setActiveTab("service")}
                  className={`py-2 text-sm font-medium ${
                    activeTab === "service"
                      ? "border-b-2 border-orange-600 text-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Service
                </button>
                <button
                  onClick={() => setActiveTab("innovation")}
                  className={`py-2 text-sm font-medium ${
                    activeTab === "innovation"
                      ? "border-b-2 border-orange-600 text-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Innovation
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 border border-gray-200 rounded-lg mt-6 bg-white">
                {activeTab === "quality" && (
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/3">
                      <Image
                        src="https://www.thedotstore.com/wp-content/uploads/sites/1417/2023/11/image-12.jpeg"
                        alt="Quality products"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Premium Quality Products
                      </h3>
                      <p className="text-gray-600">
                        We source only the finest materials and work with
                        trusted manufacturers to ensure every product meets our
                        high standards. Our rigorous quality control process
                        means you can shop with confidence.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-orange-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Carefully selected materials</span>
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-orange-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Rigorous testing procedures</span>
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-orange-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Long-lasting durability</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "service" && (
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/3">
                      <Image
                        src="https://herodesk.io/wp-content/uploads/2024/12/top-5-customer-service-challenges-for-ecommerce-webshops-and-how-to-solve-them.png"
                        alt="Customer service"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Exceptional Customer Service
                      </h3>
                      <p className="text-gray-600">
                        Our dedicated support team is always ready to assist you
                        with any questions or concerns. We believe in building
                        relationships, not just transactions.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-orange-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>24/7 customer support</span>
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-orange-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Hassle-free returns</span>
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-orange-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Personalized shopping assistance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === "innovation" && (
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="md:w-1/3">
                      <Image
                        src="https://ecombalance.com/wp-content/uploads/2024/09/StockCake-Online-shopping-setup_1725627035.jpg"
                        alt="Innovation"
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Continuous Innovation
                      </h3>
                      <p className="text-gray-600">
                        We're constantly exploring new products, technologies,
                        and ways to improve your shopping experience. Innovation
                        is at the core of our business.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-orange-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Cutting-edge product selection</span>
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-orange-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>Enhanced shopping features</span>
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-orange-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>
                            Forward-thinking sustainability initiatives
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                Testimonials
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                What our customers say
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it - hear from our satisfied
                customers.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-4xl mt-12">
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${activeTestimonial * 100}%)`,
                  }}
                >
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="h-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-white">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="space-y-2">
                            <p className="text-lg italic text-gray-700">
                              "{testimonial.content}"
                            </p>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {testimonial.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {testimonial.role}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      activeTestimonial === index
                        ? "bg-orange-600"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="w-full py-12 md:py-24 lg:py-32 bg-gray-50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-600">
                Get In Touch
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                Contact us
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-8 py-12 lg:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    placeholder="Enter your email"
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Enter your message"
                    className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full"
                >
                  Send Message
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Our Location
                </h3>
                <div className="mt-3 flex items-start space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-orange-600 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="text-gray-600">
                    123 Commerce Street
                    <br />
                    Suite 456
                    <br />
                    Anytown, ST 12345
                    <br />
                    United States
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Contact Information
                </h3>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <p className="text-gray-600">(123) 456-7890</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-gray-600">contact@yourstore.com</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Business Hours
                </h3>
                <div className="mt-3 space-y-2">
                  <p className="text-gray-600">Monday - Friday: 9am - 6pm</p>
                  <p className="text-gray-600">Saturday: 10am - 4pm</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
