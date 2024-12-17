import img from "@/src/assets/img";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { LuMessageCircle } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-orange-100 py-10 border-t border-orange-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2">
            <h1 className="text-3xl font-bold mb-4">
              <span className="text-orange-500">Dokan</span>Xpress
            </h1>
            <p className="text-sm text-gray-700">
              Book the perfect space for your next meeting. At Booking.com, we
              provide a variety of rooms designed to meet your business needs.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Image
                height={30}
                width={30}
                className="cursor-pointer"
                src={img.facebook}
                alt="Facebook"
              />
              <Image
                height={30}
                width={30}
                className="cursor-pointer"
                src={img.instagram}
                alt="Instagram"
              />
              <Image
                height={30}
                width={30}
                className="cursor-pointer"
                src={img.twitter}
                alt="Twitter"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CiLocationOn size={20} />
                <span>7895 Dr New Albuquerue, NM 19800, USA</span>
              </li>
              <li className="flex items-center gap-2">
                <IoCallOutline size={20} />
                <span>+566 477 256, +566 254 575</span>
              </li>
              <li className="flex items-center gap-2">
                <LuMessageCircle size={20} />
                <span>dokanxpress@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li>
                <Link href="/orders">Orders</Link>
              </li>
              <li>
                <Link href="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link href="/track-order">Track Order</Link>
              </li>
              <li>
                <Link href="/manage-account">Manage Account</Link>
              </li>
              <li>
                <Link href="/return-order">Return Order</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between bg-black text-white py-6 px-6 rounded-md">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} DokanXpress - All Rights Reserved
          </p>
          <Image
            style={{
              height: "auto",
              width: "250px", // Increased width for larger payment icon
            }}
            className="object-contain"
            src={img.paymentMethod}
            alt="Payment Methods"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
