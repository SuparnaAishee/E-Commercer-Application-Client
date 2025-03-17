"use client";

import UpdateProfile from "@/src/components/modal/UpdateProfile";
import { useUser } from "@/src/context/user.provider";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Edit,
  Shield,
  Clock,
  Package,
  BarChart3,
  DollarSign,
  Store,
  ShoppingBag,
  Truck,
  Globe,
} from "lucide-react";

const VendorHomePage = () => {
  const { user, isUserLoading } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  // Format join date
  const formatJoinDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Truncate description if needed
  const truncateDescription = (text?: string, limit = 150) => {
    if (!text)
      return "Passionate vendor offering high-quality products with exceptional customer service. Specializing in unique items that stand out in the marketplace.";
    if (text.length <= limit) return text;
    return showFullDescription ? text : `${text.slice(0, limit)}...`;
  };

  // Mock stats for the vendor dashboard
  const vendorStats = [
    {
      label: "Products",
      //@ts-ignore
      value: user?.productCount || 24,
      icon: <Package size={18} />,
    },
    {
      label: "Sales",
      //@ts-ignore
      value: user?.salesCount || "$4,320",
      icon: <DollarSign size={18} />,
    },
    {
      label: "Orders",
      //@ts-ignore
      value: user?.orderCount || 78,
      icon: <ShoppingBag size={18} />,
    },
  ];

  return (
    <div className="col-span-12 lg:col-span-9">
      <motion.div
        className="p-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="grid grid-cols-12 gap-6">
          {/* Profile Header */}
          <motion.div
            className="col-span-12 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl shadow-md overflow-hidden relative"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {isUserLoading ? (
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-300 animate-pulse"></div>
                ) : (
                  <div className="relative">
                    {user?.profilePhoto ? (
                      <Image
                        height={128}
                        width={128}
                        alt={`${user?.name}'s profile photo`}
                        className="rounded-full border-4 border-white shadow-lg object-cover w-24 h-24 md:w-32 md:h-32"
                        src={user.profilePhoto || "/placeholder.svg"}
                      />
                    ) : (
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-100 flex items-center justify-center border-4 border-white shadow-lg">
                        <Store size={48} className="text-emerald-500" />
                      </div>
                    )}
                    <motion.div
                      className="absolute bottom-0 right-0 bg-orange-500 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                      }}
                    />
                  </div>
                )}
              </motion.div>

              <div className="flex-1 text-center md:text-left">
                {isUserLoading ? (
                  <div className="space-y-2">
                    <div className="h-7 bg-orange-500 rounded w-48 mx-auto md:mx-0 animate-pulse"></div>
                    <div className="h-5 bg-orange-500 rounded w-32 mx-auto md:mx-0 animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {user?.name || "Vendor Store"}
                    </h2>
                    <p className="text-white flex items-center justify-center md:justify-start gap-1 mt-1">
                      <Mail size={14} />
                      <span>{user?.email || "vendor@example.com"}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
                        <Shield size={14} />
                        <span>{user?.role || "Vendor"}</span>
                      </span>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
                        <Clock size={14} />
                        <span>Joined {formatJoinDate(user?.createdAt)}</span>
                      </span>
                    </div>
                  </>
                )}
              </div>

              <div className="md:self-start">
                <UpdateProfile />
              </div>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div
            className="col-span-12 bg-white rounded-lg shadow-sm overflow-hidden"
            variants={itemVariants}
          >
            <div className="flex overflow-x-auto scrollbar-hide">
              {["profile", "products", "analytics", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium text-sm transition-colors relative flex-1 ${
                    activeTab === tab
                      ? "text-orange-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="capitalize">{tab}</span>
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                      layoutId="activeTab"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Profile Content */}
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                className="col-span-12 bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-semibold text-gray-700">
                    Vendor Information
                  </h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-orange-500 hover:text-emerald-600 flex items-center gap-1 text-sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit size={16} />
                    <span>{isEditing ? "Cancel" : "Edit"}</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Description Section */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                        <Store size={18} className="text-orange-500" />
                        <span>About Store</span>
                      </h5>
                      {isEditing ? (
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          rows={4}
                          defaultValue={
                            user?.description ||
                            "Passionate vendor offering high-quality products with exceptional customer service. Specializing in unique items that stand out in the marketplace."
                          }
                          placeholder="Tell us about your store..."
                        />
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-gray-600">
                            {truncateDescription(user?.description)}
                            {user?.description &&
                              user.description.length > 150 && (
                                <button
                                  onClick={() =>
                                    setShowFullDescription(!showFullDescription)
                                  }
                                  className="ml-1 text-emerald-500 hover:text-orange-600 font-medium"
                                >
                                  {showFullDescription
                                    ? "Show less"
                                    : "Read more"}
                                </button>
                              )}
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                        <Phone size={18} className="text-orange-500" />
                        <span>Contact Information</span>
                      </h5>
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="tel"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            //@ts-ignore
                            defaultValue={user?.phone || ""}
                            placeholder="Business phone number"
                          />
                          <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            defaultValue={user?.email || ""}
                            placeholder="Business email address"
                          />
                          <input
                            type="url"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            //@ts-ignore
                            defaultValue={user?.website || ""}
                            placeholder="Website URL"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-md space-y-2">
                          <p className="text-gray-600 flex items-center gap-2">
                            <Mail size={16} className="text-gray-400" />
                            <span>{user?.email || "vendor@example.com"}</span>
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <Phone size={16} className="text-gray-400" />

                            <span> (555) 987-6543</span>
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <Globe size={16} className="text-gray-400" />
                            <span>
                              www.vendorstore.com
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Business Address Section */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                        <MapPin size={18} className="text-orange-500" />
                        <span>Business Address</span>
                      </h5>
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            defaultValue={
                              //@ts-ignore
                              user?.address?.street || "789 Commerce Avenue"
                            }
                            placeholder="Street address"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={
                                //@ts-ignore
                                user?.address?.city || "Market City"
                              }
                              placeholder="City"
                            />
                            <input
                              type="text"
                              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={
                                //@ts-ignore
                                user?.address?.state || "Vendorland"
                              }
                              placeholder="State"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              //@ts-ignore
                              defaultValue={user?.address?.zipCode || "12345"}
                              placeholder="Zip code"
                            />
                            <input
                              type="text"
                              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={
                                //@ts-ignore
                                user?.address?.country || "United States"
                              }
                              placeholder="Country"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-md">
                          {user?.address ? (
                            <div className="space-y-1">
                              <p className="text-gray-600">
                                
                                789 Commerce Avenue
                              </p>
                              <p className="text-gray-600">
                                
                              Market City,
                                Vendorland,
                                 12345
                              </p>
                              <p className="text-gray-600">
                                
                              United States
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <p className="text-gray-600">
                                789 Commerce Avenue
                              </p>
                              <p className="text-gray-600">
                                Market City, Vendorland 12345
                              </p>
                              <p className="text-gray-600">United States</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <motion.div
                        className="mt-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <motion.button
                          className="w-full py-3 bg-orange-500 text-white rounded-md font-medium"
                          whileHover={{ backgroundColor: "#10b981" }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Save Changes
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "products" && (
              <motion.div
                key="products"
                className="col-span-12 bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-semibold text-gray-700">
                    Your Products
                  </h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm font-medium flex items-center gap-1"
                  >
                    <Package size={16} />
                    <span>Add New Product</span>
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((product) => (
                    <motion.div
                      key={product}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      whileHover={{ y: -5 }}
                    >
                      <div className="h-40 bg-gray-100 relative">
                        <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                          In Stock
                        </div>
                      </div>
                      <div className="p-4">
                        <h5 className="font-medium text-gray-800">
                          Product {product}
                        </h5>
                        <p className="text-sm text-gray-500 mt-1">
                          Category: Electronics
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className="font-bold text-orange-600">
                            $49.99
                          </span>
                          <span className="text-xs text-gray-500">
                            Sold: 24
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <motion.button
                    className="text-orange-500 hover:text-orange-600 font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All Products
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === "analytics" && (
              <motion.div
                key="analytics"
                className="col-span-12 bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-gray-700 mb-6">
                  Sales Analytics
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {vendorStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="bg-gray-50 rounded-lg p-4 text-center"
                      whileHover={{
                        y: -5,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: index * 0.1 },
                      }}
                    >
                      <div className="flex justify-center mb-2 text-emerald-500">
                        {stat.icon}
                      </div>
                      <p className="text-2xl font-bold text-gray-800">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Chart Placeholder */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 h-64 flex items-center justify-center">
                  <BarChart3 size={48} className="text-gray-300" />
                  <p className="ml-2 text-gray-400">
                    Sales chart will appear here
                  </p>
                </div>

                <h5 className="font-semibold text-gray-700 mb-4">
                  Recent Orders
                </h5>
                <div className="space-y-4">
                  {[
                    {
                      id: "#ORD-5723",
                      product: "Wireless Headphones",
                      date: "Today at 10:30 AM",
                      status: "Shipped",
                      amount: "$129.99",
                      icon: <Truck size={16} />,
                    },
                    {
                      id: "#ORD-5722",
                      product: "Smart Watch",
                      date: "Yesterday at 3:45 PM",
                      status: "Processing",
                      amount: "$199.99",
                      icon: <Package size={16} />,
                    },
                    {
                      id: "#ORD-5721",
                      product: "Bluetooth Speaker",
                      date: "March 12, 2025",
                      status: "Delivered",
                      amount: "$79.99",
                      icon: <ShoppingBag size={16} />,
                    },
                  ].map((order, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-3 border-b border-gray-100"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.1 },
                      }}
                    >
                      <div className="bg-emerald-100 p-2 rounded-full text-emerald-500">
                        {order.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-gray-800 font-medium">
                            {order.id} - {order.product}
                          </p>
                          <p className="font-bold text-emerald-600">
                            {order.amount}
                          </p>
                        </div>
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">{order.date}</p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                className="col-span-12 bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-gray-700 mb-6">
                  Store Settings
                </h4>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">
                      Store Preferences
                    </h5>
                    <div className="space-y-2">
                      {[
                        "Auto-confirm orders",
                        "Send order notifications",
                        "Show out-of-stock products",
                        "Enable customer reviews",
                      ].map((item) => (
                        <div key={item} className="flex items-center">
                          <input
                            type="checkbox"
                            id={item.replace(/\s+/g, "-").toLowerCase()}
                            className="rounded text-emerald-500 focus:ring-emerald-500 mr-2"
                            defaultChecked
                          />
                          <label
                            htmlFor={item.replace(/\s+/g, "-").toLowerCase()}
                            className="text-gray-700"
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">
                      Payment Methods
                    </h5>
                    <div className="space-y-2">
                      {[
                        "Credit/Debit Cards",
                        "PayPal",
                        "Bank Transfer",
                        "Cash on Delivery",
                      ].map((item) => (
                        <div key={item} className="flex items-center">
                          <input
                            type="checkbox"
                            id={item.replace(/\s+/g, "-").toLowerCase()}
                            className="rounded text-orange-500 focus:ring-orange-500 mr-2"
                            defaultChecked={item !== "Cash on Delivery"}
                          />
                          <label
                            htmlFor={item.replace(/\s+/g, "-").toLowerCase()}
                            className="text-gray-700"
                          >
                            {item}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <motion.button
                      className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium"
                      whileHover={{ backgroundColor: "#10b981" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Save Settings
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorHomePage;

// "use client";
// import UpdateProfile from "@/src/components/modal/UpdateProfile";
// import { useUser } from "@/src/context/user.provider";
// import Image from "next/image";
// import React from "react";
// import { FaUserCircle } from "react-icons/fa"; // Default icon for profile

// const VendorHomePage = () => {
//   const { user } = useUser();

//   return (
//     <div className="col-span-12 lg:col-span-9">
//       <div className="account_cont_wrap p-4">
//         <div className="grid grid-cols-12 gap-6">
//           {/* Personal Profile Card */}
//           <div className="col-span-12 bg-white rounded-lg shadow-md p-6 min-h-[300px]">
//             <div className="flex justify-between items-center mb-6">
//               <h4 className="text-lg font-semibold text-gray-700">
//                 Personal Profile
//               </h4>
//               <UpdateProfile />
//             </div>
//             <div className="flex items-center space-x-4 mb-6">
//               {user?.profilePhoto ? (
//                 <Image
//                   height={100}
//                   width={100}
//                   alt={`${user?.name}'s profile photo`}
//                   className="rounded-full border border-gray-200 shadow-md"
//                   src={user.profilePhoto}
//                 />
//               ) : (
//                 <FaUserCircle className="text-gray-400 text-6xl" />
//               )}
//               <div>
//                 <p className="font-semibold text-xl text-gray-800">
//                   {user?.name || "N/A"}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   {user?.email || "No email provided"}
//                 </p>
//                 <p className="text-sm text-gray-500 mt-1">
//                   {user?.role || "User"}
//                 </p>
//               </div>
//             </div>
//             <div className="mt-4">
//               <h5 className="font-semibold text-gray-700">Description</h5>
//               <p className="text-gray-600 mt-1">
//                 Enthusiastic mechanical keyboard enthusiast with a passion for
//                 coding and creating exceptional user experiences.
//               </p>
//             </div>
//             <div className="mt-4">
//               <h5 className="font-semibold text-gray-700">Address</h5>
//               <p className="text-gray-600 mt-1">
//                 1234 Coding Street, Developer City, CodeLand, 56789
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorHomePage;
