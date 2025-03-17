"use client";

import type React from "react";

import img from "@/src/assets/img";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { LuMessageCircle } from "react-icons/lu";
import { FaChevronUp, FaChevronDown, FaMapMarkerAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGlobe,
  FaTruck,
  FaHeadset,
  FaCreditCard,
  FaGift,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(0);

  const promos = [
    "Free shipping on orders over $50!",
    "Summer sale: Up to 40% off!",
    "New customers get 15% off first order with code: WELCOME15",
  ];

  useEffect(() => {
    setIsVisible(true);

    // Rotate through promos
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  };

  return (
    <>
      {/* Sub-Footer (Announcement Bar) */}
      <div className="bg-orange-500 text-white py-2 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-8">
              <motion.div
                className="flex items-center space-x-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <FaTruck className="text-white" />
                <span className="text-sm">Free shipping over $50</span>
              </motion.div>

              <motion.div
                className="hidden md:flex items-center space-x-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <FaHeadset className="text-white" />
                <span className="text-sm">24/7 Customer Support</span>
              </motion.div>

              <motion.div
                className="hidden md:flex items-center space-x-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <FaCreditCard className="text-white" />
                <span className="text-sm">Secure Payment</span>
              </motion.div>
            </div>

            <motion.div
              className="flex items-center mt-2 md:mt-0"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center space-x-2 mr-4">
                <FaGlobe className="text-white" />
                <select className="bg-transparent text-white text-sm border-none focus:ring-0 cursor-pointer">
                  <option value="en" className="text-gray-800">
                    English
                  </option>
                  <option value="es" className="text-gray-800">
                    Español
                  </option>
                  <option value="fr" className="text-gray-800">
                    Français
                  </option>
                </select>
              </div>

              <select className="bg-transparent text-white text-sm border-none focus:ring-0 cursor-pointer">
                <option value="usd" className="text-gray-800">
                  USD
                </option>
                <option value="eur" className="text-gray-800">
                  EUR
                </option>
                <option value="gbp" className="text-gray-800">
                  GBP
                </option>
              </select>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-orange-50 text-orange-800 py-2 ">
        <div className="container mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center"
            >
              <FaGift className="mr-2" />
              <p className="text-sm font-medium">{promos[currentPromo]}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Footer */}
      <footer className="bg-orange-100 py-10 pt-8 border-t border-orange-200">
        <div className="container mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <motion.div
              className="col-span-1 md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <motion.h1
                  className="text-3xl font-bold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="text-orange-500">Dokan</span>Xpress
                </motion.h1>
              </div>

              <p className="text-sm text-gray-700 mb-6">
                Book the perfect space for your next meeting. At Booking.com, we
                provide a variety of rooms designed to meet your business needs.
              </p>

              {/* Newsletter Subscription */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-2">
                  Subscribe to our newsletter
                </h4>
                <form onSubmit={handleSubmit} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="px-4 py-2 rounded-l-md border-orange-200 border focus:outline-none focus:ring-2 focus:ring-orange-300 flex-grow text-sm"
                    required
                  />
                  <motion.button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded-r-md text-sm font-medium"
                    whileHover={{ backgroundColor: "#ea580c" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </form>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-2 rounded-full shadow-md"
                >
                  <FaFacebookF className="text-orange-500 text-lg" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-2 rounded-full shadow-md"
                >
                  <FaInstagram className="text-orange-500 text-lg" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-2 rounded-full shadow-md"
                >
                  <FaTwitter className="text-orange-500 text-lg" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-2 rounded-full shadow-md"
                >
                  <FaLinkedinIn className="text-orange-500 text-lg" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white p-2 rounded-full shadow-md"
                >
                  <FaYoutube className="text-orange-500 text-lg" />
                </motion.a>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-1"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Contact Us</h3>
                {isMobile() && (
                  <button
                    onClick={() => toggleSection("contact")}
                    className="md:hidden"
                  >
                    {expandedSection === "contact" ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {(!isMobile() || expandedSection === "contact") && (
                  <motion.ul
                    className="space-y-4 text-sm text-gray-700"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.li
                      className="flex items-start gap-2"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <CiLocationOn
                        size={20}
                        className="text-orange-500 mt-1"
                      />
                      <span>Road 12,Uttara, Dhaka</span>
                    </motion.li>

                    <motion.li
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <IoCallOutline size={20} className="text-orange-500" />
                      <a
                        href="tel:+566477256"
                        className="hover:text-orange-500 transition-colors"
                      >
                        +153468998, +1829653456
                      </a>
                    </motion.li>

                    <motion.li
                      className="flex items-center gap-2"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <LuMessageCircle size={20} className="text-orange-500" />
                      <a
                        href="mailto:dokanxpress@gmail.com"
                        className="hover:text-orange-500 transition-colors"
                      >
                        dokanxpress@gmail.com
                      </a>
                    </motion.li>

                    <motion.li
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <button
                        onClick={() => setIsMapOpen(true)}
                        className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
                      >
                        <FaMapMarkerAlt size={16} />
                        <span>View on map</span>
                      </button>

                      <AnimatePresence>
                        {isMapOpen && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                            onClick={() => setIsMapOpen(false)}
                          >
                            <motion.div
                              className="bg-white rounded-lg overflow-hidden max-w-2xl w-full"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="p-4 border-b flex justify-between items-center">
                                <h3 className="font-semibold">Our Location</h3>
                                <button onClick={() => setIsMapOpen(false)}>
                                  ×
                                </button>
                              </div>
                              <div className="h-80 bg-gray-200">
                                {/* <iframe
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423283.4355529052!2d-106.76492162847443!3d35.08402670609684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87220addd309837b%3A0xc0d3f8ceb8d9f6fd!2sAlbuquerque%2C%20NM%2C%20USA!5e0!3m2!1sen!2s!4v1616603423069!5m2!1sen!2s"
                                  width="100%"
                                  height="100%"
                                  style={{ border: 0 }}
                                  allowFullScreen
                                  loading="lazy"
                                ></iframe> */}
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Quick Links</h3>
                {isMobile() && (
                  <button
                    onClick={() => toggleSection("links")}
                    className="md:hidden"
                  >
                    {expandedSection === "links" ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {(!isMobile() || expandedSection === "links") && (
                  <motion.ul
                    className="space-y-3 text-sm text-gray-700"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {[
                      { href: "/orders", label: "Orders" },
                      { href: "/wishlist", label: "Wishlist" },
                      { href: "/track-order", label: "Track Order" },
                      { href: "/manage-account", label: "Manage Account" },
                      { href: "/return-order", label: "Return Order" },
                      { href: "/help-center", label: "Help Center" },
                    ].map((link, index) => (
                      <motion.li key={index}>
                        <Link
                          href={link.href}
                          className="hover:text-orange-500 transition-colors relative group flex items-center"
                        >
                          <motion.span
                            className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"
                            whileHover={{ width: "100%" }}
                          />
                          <span>{link.label}</span>
                          <motion.span
                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            initial={{ x: -5 }}
                            whileHover={{ x: 0 }}
                          >
                            →
                          </motion.span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div
            className="mt-12 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-gray-900 text-white py-6 px-6 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <motion.p
                  className="text-sm mb-4 md:mb-0"
                  whileHover={{ scale: 1.02 }}
                >
                  &copy; {new Date().getFullYear()} DokanXpress - All Rights
                  Reserved
                </motion.p>

                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    style={{
                      height: "auto",
                      width: "250px",
                    }}
                    className="object-contain"
                    src={img.paymentMethod || "/placeholder.svg"}
                    alt="Payment Methods"
                  />
                </motion.div>
              </div>
            </div>

            {/* Terms and Privacy Links */}
            <div className="flex flex-wrap justify-center mt-6 gap-x-6 gap-y-2 text-sm text-gray-600">
              {[
                { href: "/terms", label: "Terms & Conditions" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/shipping", label: "Shipping Policy" },
                { href: "/refund", label: "Refund Policy" },
              ].map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="hover:text-orange-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

// import img from "@/src/assets/img";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { CiLocationOn } from "react-icons/ci";
// import { IoCallOutline } from "react-icons/io5";
// import { LuMessageCircle } from "react-icons/lu";

// const Footer = () => {
//   return (
//     <footer className="bg-orange-100 py-10 border-t border-orange-200">
//       <div className="container mx-auto px-4 pl-12 pr-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Logo and Description */}
//           <div className="col-span-2">
//             <h1 className="text-3xl font-bold mb-4">
//               <span className="text-orange-500">Dokan</span>Xpress
//             </h1>
//             <p className="text-sm text-gray-700">
//               Book the perfect space for your next meeting. At Booking.com, we
//               provide a variety of rooms designed to meet your business needs.
//             </p>
//             <div className="flex items-center gap-4 mt-4">
//               <Image
//                 height={30}
//                 width={30}
//                 className="cursor-pointer"
//                 src={img.facebook}
//                 alt="Facebook"
//               />
//               <Image
//                 height={30}
//                 width={30}
//                 className="cursor-pointer"
//                 src={img.instagram}
//                 alt="Instagram"
//               />
//               <Image
//                 height={30}
//                 width={30}
//                 className="cursor-pointer"
//                 src={img.twitter}
//                 alt="Twitter"
//               />
//             </div>
//           </div>

//           {/* Contact Information */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <ul className="space-y-3 text-sm text-gray-700">
//               <li className="flex items-center gap-2">
//                 <CiLocationOn size={20} />
//                 <span>7895 Dr New Albuquerue, NM 19800, USA</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 <IoCallOutline size={20} />
//                 <span>+566 477 256, +566 254 575</span>
//               </li>
//               <li className="flex items-center gap-2">
//                 <LuMessageCircle size={20} />
//                 <span>dokanxpress@gmail.com</span>
//               </li>
//             </ul>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-3 text-sm text-gray-700">
//               <li>
//                 <Link href="/orders">Orders</Link>
//               </li>
//               <li>
//                 <Link href="/wishlist">Wishlist</Link>
//               </li>
//               <li>
//                 <Link href="/track-order">Track Order</Link>
//               </li>
//               <li>
//                 <Link href="/manage-account">Manage Account</Link>
//               </li>
//               <li>
//                 <Link href="/return-order">Return Order</Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Footer Bottom */}
//         <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between bg-black text-white py-6 px-6 rounded-md">
//           <p className="text-sm">
//             &copy; {new Date().getFullYear()} DokanXpress - All Rights Reserved
//           </p>
//           <Image
//             style={{
//               height: "auto",
//               width: "250px", // Increased width for larger payment icon
//             }}
//             className="object-contain"
//             src={img.paymentMethod}
//             alt="Payment Methods"
//           />
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
