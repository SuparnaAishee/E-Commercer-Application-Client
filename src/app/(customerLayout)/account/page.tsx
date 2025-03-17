// "use client";
// import UpdateProfile from "@/src/components/modal/UpdateProfile";
// import { useUser } from "@/src/context/user.provider";
// import Image from "next/image";
// import React from "react";
// import { FaUserCircle } from "react-icons/fa"; // Default icon for profile

// const UserHomePage = () => {
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

// export default UserHomePage;
"use client";

import UpdateProfile from "@/src/components/modal/UpdateProfile";
import { useUser } from "@/src/context/user.provider";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Edit,
  Shield,
  Clock,
  Award,
  Activity,
  Star,
} from "lucide-react";

const UserHomePage = () => {
  const { user, isUserLoading } = useUser();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  console.log("User data:", user);

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
    if (!text) return "No description available";
    if (text.length <= limit) return text;
    return showFullDescription ? text : `${text.slice(0, limit)}...`;
  };

  // Mock stats for the activity section
  const userStats = [
    {
      label: "Orders",
      value: user?.orderCount || 0,
      icon: <Activity size={18} />,
    },
    {
      label: "Wishlist",
      value: user?.wishlistCount || 0,
      icon: <Award size={18} />,
    },
    {
      label: "Reviews",
      value: user?.reviewCount || 0,
      icon: <Star size={18} />,
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
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-orange-300 animate-pulse"></div>
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
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-orange-100 flex items-center justify-center border-4 border-white shadow-lg">
                        <User size={48} className="text-orange-500" />
                      </div>
                    )}
                    <motion.div
                      className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-white"
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
                    <div className="h-7 bg-orange-300 rounded w-48 mx-auto md:mx-0 animate-pulse"></div>
                    <div className="h-5 bg-orange-300 rounded w-32 mx-auto md:mx-0 animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                      {user?.name || "Welcome"}
                    </h2>
                    <p className="text-orange-100 flex items-center justify-center md:justify-start gap-1 mt-1">
                      <Mail size={14} />
                      <span>{user?.email || "No email provided"}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-1">
                        <Shield size={14} />
                        <span>{user?.role || "User"}</span>
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
              {["profile", "activity", "settings"].map((tab) => (
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
                    Personal Information
                  </h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm"
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
                        <User size={18} className="text-orange-500" />
                        <span>About Me</span>
                      </h5>
                      {isEditing ? (
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          rows={4}
                          defaultValue={user?.description || ""}
                          placeholder="Tell us about yourself..."
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
                                  className="ml-1 text-orange-500 hover:text-orange-600 font-medium"
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
                            defaultValue={user?.phone || ""}
                            placeholder="Phone number"
                          />
                          <input
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            defaultValue={user?.email || ""}
                            placeholder="Email address"
                          />
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-md space-y-2">
                          <p className="text-gray-600 flex items-center gap-2">
                            <Mail size={16} className="text-gray-400" />
                            <span>{user?.email || "No email provided"}</span>
                          </p>
                          <p className="text-gray-600 flex items-center gap-2">
                            <Phone size={16} className="text-gray-400" />
                            <span>{user?.phone || "No phone provided"}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-700 flex items-center gap-2 mb-2">
                        <MapPin size={18} className="text-orange-500" />
                        <span>Address</span>
                      </h5>
                      {isEditing ? (
                        <div className="space-y-3">
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            defaultValue={user?.address?.street || ""}
                            placeholder="Street address"
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={user?.address?.city || ""}
                              placeholder="City"
                            />
                            <input
                              type="text"
                              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={user?.address?.state || ""}
                              placeholder="State"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <input
                              type="text"
                              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={user?.address?.zipCode || ""}
                              placeholder="Zip code"
                            />
                            <input
                              type="text"
                              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              defaultValue={user?.address?.country || ""}
                              placeholder="Country"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-50 p-4 rounded-md">
                          {user?.address ? (
                            <div className="space-y-1">
                              <p className="text-gray-600">
                                {user.address.street || "No street provided"}
                              </p>
                              <p className="text-gray-600">
                                {user.address.city || "No city"},{" "}
                                {user.address.state || "No state"}{" "}
                                {user.address.zipCode || "No zip code"}
                              </p>
                              <p className="text-gray-600">
                                {user.address.country || "No country provided"}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-600">
                              No address information available
                            </p>
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
                          whileHover={{ backgroundColor: "#ea580c" }}
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

            {activeTab === "activity" && (
              <motion.div
                key="activity"
                className="col-span-12 bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-lg font-semibold text-gray-700 mb-6">
                  Activity & Statistics
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {userStats.map((stat, index) => (
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
                      <div className="flex justify-center mb-2 text-orange-500">
                        {stat.icon}
                      </div>
                      <p className="text-2xl font-bold text-gray-800">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                <h5 className="font-semibold text-gray-700 mb-4">
                  Recent Activity
                </h5>
                <div className="space-y-4">
                  {user?.recentActivity ? (
                    user.recentActivity.map((activity, index) => (
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
                        <div className="bg-orange-100 p-2 rounded-full text-orange-500">
                          {activity.icon || <Activity size={16} />}
                        </div>
                        <div>
                          <p className="text-gray-800">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {activity.date}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No recent activity to display
                    </p>
                  )}
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
                  Account Settings
                </h4>

                <div className="space-y-6">
                  <div>
                    <h5 className="font-medium text-gray-700 mb-3">
                      Notification Preferences
                    </h5>
                    <div className="space-y-2">
                      {[
                        "Order updates",
                        "Promotions and offers",
                        "Account activity",
                        "Product recommendations",
                      ].map((item) => (
                        <div key={item} className="flex items-center">
                          <input
                            type="checkbox"
                            id={item.replace(/\s+/g, "-").toLowerCase()}
                            className="rounded text-orange-500 focus:ring-orange-500 mr-2"
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
                      Privacy Settings
                    </h5>
                    <div className="space-y-2">
                      {[
                        "Show my profile to other users",
                        "Allow search engines to index my profile",
                        "Share my activity data",
                      ].map((item) => (
                        <div key={item} className="flex items-center">
                          <input
                            type="checkbox"
                            id={item.replace(/\s+/g, "-").toLowerCase()}
                            className="rounded text-orange-500 focus:ring-orange-500 mr-2"
                            defaultChecked={
                              item === "Show my profile to other users"
                            }
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
                      whileHover={{ backgroundColor: "#ea580c" }}
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

export default UserHomePage;

