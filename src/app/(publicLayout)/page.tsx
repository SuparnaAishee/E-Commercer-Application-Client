// "use client";

// import Hero from "@/src/components/modules/public/Home/Hero";
// import CategoryCard from "@/src/components/UI/CategoryCard/CategoryCard";
// import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
// import { useGetAllCategory } from "@/src/hooks/category";
// import { useGetAllFlashSale } from "@/src/hooks/flashSale";
// import { useGetAllProducts } from "@/src/hooks/product";
// import Link from "next/link";


// export default function Home() {
//   const { data: products } = useGetAllProducts([]);
//   const { data: categories } = useGetAllCategory([]);
//   const { data } = useGetAllFlashSale();

//   return (
//     <section className="flex flex-col items-center justify-center gap-8">
//       <Hero />
//       {/* Shop By Category Section */}
//       <div className="container pb-14 ">
//         <h2 className="text-[28px] sm:text-[32px] font-medium text-secondary text-center mb-6">
//           Shop by Category
//         </h2>
//         <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 ml-12 mr-12 ">
//           {categories?.data?.map((category) => (
//             <Link
//               key={category.id}
//               href={`/products?category=${category.id}`}
//               className="bg-gray-100 rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow"
//             >
//               <div className="flex flex-col items-center group">
//                 <div className="overflow-hidden rounded-md">
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     className="w-full h-40 object-cover rounded-md transform transition-transform duration-300 group-hover:scale-105"
//                   />
//                 </div>
//                 <h3 className="mt-2 text-lg font-medium text-gray-800 group-hover:text-primary transition-colors">
//                   {category.name}
//                 </h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//       {/* Recommended for You Section */}
//       <div className="container pb-14 ">
//         <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary text-center mb-6">
//           Featured Product
//         </h2>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ml-12 mr-12">
//           {products?.data
//             ?.slice(0, 8)
//             .map((product) => (
//               <ProductCart key={product.id} product={product} />
//             ))}
//         </div>
//         <div className="text-center pt-4">
//           <Link
//             href="/products"
//             className="text-[15px] font-medium text-primary flex items-center gap-1 justify-center"
//           >
//             See More
//             <svg width="15" height="15" viewBox="0 0 32 32">
//               <path
//                 fill="currentColor"
//                 d="M12.969 4.281L11.53 5.72L21.812 16l-10.28 10.281l1.437 1.438l11-11l.687-.719l-.687-.719z"
//               ></path>
//             </svg>
//           </Link>
//         </div>
//       </div>

//       {/* Flash Sale Section */}
//       <div className="container pb-14 ">
//         <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary text-center mb-6">
//          Offer Going On
//         </h2>
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 ml-12 mr-12">
//           {data?.data?.map((product) => (
//             <ProductCart key={product.id} product={product} />
//           ))}
//         </div>
//         <div className="text-center pt-4">
//           <Link
//             href="/products"
//             className="text-[15px] font-medium text-primary flex items-center gap-1 justify-center"
//           >
//             See More
//             <svg width="15" height="15" viewBox="0 0 32 32">
//               <path
//                 fill="currentColor"
//                 d="M12.969 4.281L11.53 5.72L21.812 16l-10.28 10.281l1.437 1.438l11-11l-.687-.719l-.687-.719z"
//               ></path>
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "@/src/components/modules/public/Home/Hero";
import { useGetAllCategory } from "@/src/hooks/category";
import ProductCart from "@/src/components/UI/ProductCart/ProductCart";
import { useGetAllProducts } from "@/src/hooks/product";
import { useGetAllFlashSale } from "@/src/hooks/flashSale";
import { Clock } from "lucide-react";
// Mock data for demonstration
const mockCategories = [
  {
    id: 1,
    name: "Electronics",
    image: "/placeholder.svg?height=160&width=240",
  },
  { id: 2, name: "Fashion", image: "/placeholder.svg?height=160&width=240" },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "/placeholder.svg?height=160&width=240",
  },
  { id: 4, name: "Beauty", image: "/placeholder.svg?height=160&width=240" },
  { id: 5, name: "Sports", image: "/placeholder.svg?height=160&width=240" },
  { id: 6, name: "Books", image: "/placeholder.svg?height=160&width=240" },
];

const mockProducts = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 100) + 20,
    oldPrice: Math.floor(Math.random() * 150) + 50,
    image: `/placeholder.svg?height=300&width=300`,
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviews: Math.floor(Math.random() * 500),
    isNew: i < 4,
    discount: Math.floor(Math.random() * 40) + 10,
    isTrending: i % 3 === 0,
  }));

const mockBrands = [
  {
    id: 1,
    name: "Brand 1",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882747.png",
  },
  {
    id: 2,
    name: "Brand 2",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882703.png",
  },
  {
    id: 3,
    name: "Brand 3",
    logo: "https://1000logos.net/wp-content/uploads/2021/04/MAC-Cosmetics-logo.png",
  },
  {
    id: 4,
    name: "Brand 4",
    logo: "https://cdn-icons-png.flaticon.com/512/882/882744.png",
  },
  {
    id: 5,
    name: "Brand 5",
    logo: "https://static.vecteezy.com/system/resources/previews/020/336/471/non_2x/panasonic-logo-panasonic-icon-free-free-vector.jpg",
  },
  {
    id: 6,
    name: "Brand 6",
    logo: "https://cdn.iconscout.com/icon/free/png-256/free-logitech-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-14-pack-icons-283493.png",
  },
];

const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "I've been shopping here for years and the quality never disappoints. Their customer service is exceptional!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "First-time Buyer",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "As a first-time customer, I was blown away by the attention to detail and the speed of delivery. Will definitely shop again!",
    rating: 4,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Regular Shopper",
    image: "/placeholder.svg?height=80&width=80",
    content:
      "The product range is incredible and the website makes finding exactly what I need so easy. My go-to online store!",
    rating: 5,
  },
];

const mockBlogs = [
  {
    id: 1,
    title: "Top 10 Summer Fashion Trends",
    excerpt: "Discover the hottest fashion trends for this summer season...",
    image:
      "https://us.123rf.com/450wm/roxiller/roxiller2003/roxiller200300062/141473566-summer-holiday-flat-lay-womans-accessories-on-colorful.jpg?ver=6",
    date: "June 15, 2023",
    category: "Fashion",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Headphones",
    excerpt:
      "A comprehensive guide to selecting headphones that match your needs...",
    image:
      "https://png.pngtree.com/background/20231101/original/pngtree-imagining-the-audio-book-experience-wooden-table-setting-with-wireless-black-picture-image_5828867.jpg",
    date: "May 28, 2023",
    category: "Electronics",
  },
  {
    id: 3,
    title: "Essential Kitchen Gadgets for 2023",
    excerpt:
      "Transform your cooking experience with these innovative kitchen tools...",
    image:
      "https://people.com/thmb/gYvWUOjf3e83HhXcJc-AfEBsJLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(2999x0:3001x2)/week-5-amazon-tk-kitchen-gadgets-tout-13b03a8e015047b18042b6ebf172c36a.jpg",
    date: "April 10, 2023",
    category: "Home & Kitchen",
  },
];

export default function Home() {
  const { data: categories } = useGetAllCategory([]);
  const { data: products } = useGetAllProducts([]);
  const flashSaleProducts = products?.data
    ?.filter((product) => product.isFlashSale)
    .slice(0, 5); // Get the first 5 flash sale products
  // // Filter out the flash sale products
  // const flashSaleProducts = products?.data?.filter(
  //   (product) => product.isFlashSale
  // );

  const { data: recentproducts } = useGetAllProducts([
    { name: "searchTerm", value: "recentViewedProduct" },
  ]);

  // State for interactive elements
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    isNew: boolean;
    discount: number;
    isTrending: boolean;
  }

  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("all");
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 30,
    seconds: 0,
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const heroSliderRef = useRef(null);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Countdown for Flash Sale (if needed)
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return {
            hours: prevTime.hours,
            minutes: prevTime.minutes - 1,
            seconds: 59,
          };
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else {
          clearInterval(countdownInterval);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);
  // Hero slider images
  const heroSlides = [
    {
      image: "/placeholder.svg?height=600&width=1600",
      title: "Summer Collection 2023",
      subtitle: "Up to 50% off on selected items",
      buttonText: "Shop Now",
      buttonLink: "/products",
      color: "bg-orange-600",
    },
    {
      image: "/placeholder.svg?height=600&width=1600",
      title: "New Arrivals",
      subtitle: "Check out our latest products",
      buttonText: "Discover",
      buttonLink: "/products?new=true",
      color: "bg-blue-600",
    },
    {
      image: "/placeholder.svg?height=600&width=1600",
      title: "Limited Time Offer",
      subtitle: "Free shipping on orders over $50",
      buttonText: "Get Started",
      buttonLink: "/products?sale=true",
      color: "bg-green-600",
    },
  ];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return {
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Show newsletter popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewsletter(true);
    });

    return () => clearTimeout(timer);
  }, []);

  // Hero slider auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate recently viewed products
  useEffect(() => {
    //@ts-ignore
    setRecentlyViewed(mockProducts.slice(0, 4));
  }, []);

  // Handle newsletter submission
  //@ts-ignore
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setToastMessage("Thank you for subscribing to our newsletter!");
      setShowToast(true);
      setShowNewsletter(false);
      setEmail("");

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  // Handle quick view
  //@ts-ignore
  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setShowQuickView(true);
  };

  // Filter products based on active tab
  const filteredProducts = () => {
    if (activeTab === "all") return mockProducts.slice(0, 8);
    if (activeTab === "new")
      return mockProducts.filter((p) => p.isNew).slice(0, 8);
    if (activeTab === "trending")
      return mockProducts.filter((p) => p.isTrending).slice(0, 8);
    return mockProducts.slice(0, 8);
  };

  // Add to cart function
  //@ts-ignore
  const addToCart = (product) => {
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-md"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {toastMessage}
                </p>
              </div>
              <div className="ml-auto pl-3">
                <button
                  onClick={() => setShowToast(false)}
                  className="inline-flex text-gray-400 hover:text-gray-500"
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Newsletter Popup */}
      <AnimatePresence>
        {showNewsletter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden"
            >
              <div className="relative">
                <button
                  onClick={() => setShowNewsletter(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                >
                  <svg
                    className="h-6 w-6"
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
                <div className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      Join Our Newsletter
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Subscribe to get special offers, free giveaways, and
                      once-in-a-lifetime deals.
                    </p>
                  </div>
                  <form onSubmit={handleNewsletterSubmit} className="mt-6">
                    <div className="mb-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    By subscribing, you agree to our Privacy Policy and consent
                    to receive updates from our company.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden"
            >
              <div className="relative">
                <button
                  onClick={() => setShowQuickView(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 z-10"
                >
                  <svg
                    className="h-6 w-6"
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
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 flex items-center justify-center bg-gray-100">
                    <img
                      //@ts-ignore
                      src={quickViewProduct.image || "/placeholder.svg"}
                      //@ts-ignore
                      alt={quickViewProduct.name}
                      className="max-h-80 object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {quickViewProduct.name}
                    </h3>
                    <div className="flex items-center mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-5 w-5 ${
                              i <
                              Math.floor(
                                //@ts-ignore
                                quickViewProduct.rating
                              )
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-gray-600 text-sm">
                          ({quickViewProduct.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <span className="text-2xl font-bold text-gray-900">
                        ${quickViewProduct.price}
                      </span>
                      {quickViewProduct.oldPrice && (
                        <span className="ml-2 text-gray-500 line-through">
                          ${quickViewProduct.oldPrice}
                        </span>
                      )}

                      {quickViewProduct.discount && (
                        <span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
                          {quickViewProduct.discount}% OFF
                        </span>
                      )}
                    </div>
                    <p className="mt-4 text-gray-600">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed euismod, diam quis aliquam tincidunt, nisl nisi
                      aliquam nunc, vitae aliquam nisl nunc eu nisi.
                    </p>
                    <div className="mt-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <span className="text-gray-700">Size:</span>
                        <div className="flex space-x-2">
                          {["S", "M", "L", "XL"].map((size) => (
                            <button
                              key={size}
                              className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center text-sm font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-gray-700">Color:</span>
                        <div className="flex space-x-2">
                          {[
                            "bg-red-500",
                            "bg-blue-500",
                            "bg-green-500",
                            "bg-yellow-500",
                          ].map((color) => (
                            <button
                              key={color}
                              className={`w-8 h-8 ${color} rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
                            ></button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button className="px-3 py-1 text-gray-600 hover:text-gray-700">
                            -
                          </button>
                          <span className="px-3 py-1 text-gray-800">1</span>
                          <button className="px-3 py-1 text-gray-600 hover:text-gray-700">
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            addToCart(quickViewProduct);
                            setShowQuickView(false);
                          }}
                          className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <Hero />
      </div>

      {/* 2. Benefits/Features Section */}
      <section className="py-10 bg-gray-50 pl-6 pr-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="rounded-full bg-orange-100 p-3 mr-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">On all orders over $50</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex items-center p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="rounded-full bg-orange-100 p-3 mr-4">
                <svg
                  className="w-6 h-6 text-orange-600"
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
              <div>
                <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-sm text-gray-600">Customer support</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="rounded-full bg-orange-100 p-3 mr-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Money Back</h3>
                <p className="text-sm text-gray-600">30-day guarantee</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex items-center p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="rounded-full bg-orange-100 p-3 mr-4">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Payments</h3>
                <p className="text-sm text-gray-600">100% protected checkout</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Shop By Category Section */}
      <section className="py-12 pl-6 pr-6">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="mt-2 text-gray-600">
              Browse our wide selection of products by category
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
            {categories?.data?.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Link
                  href={`/products?category=${category.id}`}
                  className="block"
                >
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm">
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={240}
                        height={160}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Deal of the Day with Countdown */}
      <section className="py-12 pl-8 pr-6 bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="max-w-lg">
                <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Limited Time Offer
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Deal of the Day
                </h2>
                <p className="text-gray-600 mb-6">
                  Don&apos;t miss out on our exclusive deal of the day! Get this
                  premium product at an unbeatable price.
                </p>

                <div className="flex space-x-4 mb-6">
                  <div className="bg-white rounded-lg shadow-sm p-3 w-20 text-center">
                    <span className="block text-2xl font-bold text-gray-900">
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs text-gray-500">Hours</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-3 w-20 text-center">
                    <span className="block text-2xl font-bold text-gray-900">
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs text-gray-500">Minutes</span>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-3 w-20 text-center">
                    <span className="block text-2xl font-bold text-gray-900">
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </span>
                    <span className="text-xs text-gray-500">Seconds</span>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    $129.99
                  </span>
                  <span className="ml-2 text-xl text-gray-500 line-through">
                    $199.99
                  </span>
                  <span className="ml-2 mr-4 bg-red-100 text-red-800 text-sm  px-2 py-1 rounded font-semibold">
                    35% OFF
                  </span>
                </div>

                <Link
                  href="/products/deal-of-the-day"
                  className="inline-block bg-orange-600 text-white py-3 px-8 rounded-full text-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -right-2 bg-red-500 text-white text-lg font-bold w-20 h-16 rounded-full flex items-center justify-center transform rotate-12 z-10">
                  30% OFF
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                  <img
                    src="https://cdn3.f-cdn.com//files/download/186511415/JUST%20FOR%20YOU%20jpg.jpg?width=780&height=438&fit=crop"
                    alt="Deal of the Day Product"
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Recommended for You Section */}
      <div className="container pb-14 mt-12">
        <h2 className="text-[22px] sm:text-[32px] font-bold text-secondary text-center  text-gray-900">
          Featured Product
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Browse our wide selection of products
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 ml-12 mr-12">
          {products?.data
            ?.slice(0, 10)

            .map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
        </div>
        <div className="text-center pt-4">
          <Link
            href="/products"
            className="text-[15px] font-medium text-primary flex items-center gap-1 justify-center"
          >
            See More
            <svg width="15" height="15" viewBox="0 0 32 32">
              <path
                fill="currentColor"
                d="M12.969 4.281L11.53 5.72L21.812 16l-10.28 10.281l1.437 1.438l11-11l.687-.719l-.687-.719z"
              ></path>
            </svg>
          </Link>
        </div>
      </div>

      {/* 5. Featured Products with Tabs
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="mt-2 text-gray-600">
              Discover our selection of top products
            </p>

            <div className="flex justify-center mt-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "all"
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setActiveTab("new")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "new"
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveTab("trending")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "trending"
                    ? "text-orange-600 border-b-2 border-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Trending
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts().map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden group"
              >
                <div className="relative">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </div>
                  )}
                  {product.isNew && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleQuickView(product)}
                      className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-600 hover:text-white transition-colors transform -translate-y-4 group-hover:translate-y-0 transition-transform"
                    >
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-1 text-xs text-gray-500">
                        ({product.rating})
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.oldPrice}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="text-orange-600 hover:text-orange-700"
                      aria-label="Add to cart"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/products"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              View All Products
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section> */}

      {/* 6. Banner Section */}
      <section className="py-12 pl-6 pr-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg h-64 group"
            >
              <Image
                src="https://img.freepik.com/premium-vector/summer-sale-banner-template-promotion-with-product-display-cylindrical-shape-beach-background_255246-2414.jpg"
                alt="Summer Collection"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60"></div>
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Summer Collection</h3>
                <p className="mb-4">Up to 30% off on selected items</p>
                <Link
                  href="/products?collection=summer"
                  className="inline-block bg-white text-gray-900 py-2 px-4 rounded-full text-sm font-medium hover:bg-orange-600 hover:text-white transition-colors w-max"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg h-64 group"
            >
              <Image
                src="https://img.freepik.com/premium-photo/modern-smartwatch-wireless-earbuds-smartphone-black-desk_1346134-17718.jpg"
                alt="New Arrivals"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-60"></div>
              <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
                <p className="mb-4">Check out our latest products</p>
                <Link
                  href="/products?new=true"
                  className="inline-block bg-white text-gray-900 py-2 px-4 rounded-full text-sm font-medium hover:bg-orange-600 hover:text-white transition-colors w-max"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Flash Sale Section */}
      <section className="relative bg-gray-100 py-12 pl-12 pr-8">
        <div className="container mx-auto text-center">
          {/* Your content here */}
        </div>
        <h2 className="text-3xl text-center font-semibold text-gray-900 mb-6">
          Flash Sale
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Grab the best deals on our top products
        </p>
        {/* Flash Sale Timer */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {timeLeft.hours > 0 ||
          timeLeft.minutes > 0 ||
          timeLeft.seconds > 0 ? (
            <div className="flex items-center gap-2 bg-red-50 p-3 rounded-lg">
              <Clock className="text-red-500" size={20} />
              <div className="flex gap-2">
                <div className="bg-red-500 text-white px-2 py-1 rounded">
                  {timeLeft.hours.toString().padStart(2, "0")}h
                </div>
                <div className="bg-red-500 text-white px-2 py-1 rounded">
                  {timeLeft.minutes.toString().padStart(2, "0")}m
                </div>
                <div className="bg-red-500 text-white px-2 py-1 rounded">
                  {timeLeft.seconds.toString().padStart(2, "0")}s
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xl font-semibold text-gray-600">
              Sale Ended
            </div>
          )}
        </div>

        {/* Flash Sale Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {flashSaleProducts
            ?.slice(0, 5)
            .map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
        </div>
      </section>
      {/* 9. Brand Showcase */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Our Brands</h2>
            <p className="mt-2 text-gray-600">
              We partner with the best brands in the industry
            </p>
          </div>

          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pl-4 pr-4">
            {mockBrands.map((brand) => (
              <motion.div
                key={brand.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-6 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  className="max-h-20"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Recently Viewed Products */}
      <section className="py-12 pl-8 pr-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Recently Viewed
            </h2>
            <p className="mt-2 text-gray-600">
              Products you&apos;ve checked out recently
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {recentproducts?.data
              ?.slice(0, 5)
              .map((product) => (
                <ProductCart key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>

      {/* 12. Interactive Product Finder */}
      <section className="py-12 mt-8 mb-8 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Find Your Perfect Product</h2>
            <p className="mt-2 text-white text-opacity-80">
              Answer a few questions to get personalized recommendations
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-6">
                What are you looking for today?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 flex flex-col items-center transition-colors"
                >
                  <svg
                    className="w-8 h-8 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>Fashion</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 flex flex-col items-center transition-colors"
                >
                  <svg
                    className="w-8 h-8 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Electronics</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 flex flex-col items-center transition-colors"
                >
                  <svg
                    className="w-8 h-8 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Home</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 flex flex-col items-center transition-colors"
                >
                  <svg
                    className="w-8 h-8 mb-2"
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
                  <span>Beauty</span>
                </motion.button>
              </div>

              <button className="mt-8 bg-white text-orange-600 py-3 px-8 rounded-full text-lg font-medium hover:bg-opacity-90 transition-colors">
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Blog/Articles Preview */}
      <section className="py-16 pl-6 pr-6 bg-gray-50 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">From Our Blog</h2>
            <p className="mt-2 text-gray-600">
              Read our latest articles and stay updated
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {blog.category}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{blog.excerpt}</p>
                  <Link
                    href={`/blog/${blog.id}`}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm inline-flex items-center"
                  >
                    Read More
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
            >
              View All Articles
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div> */}
        </div>
      </section>
      {/* 13. Instagram Feed/Social Proof
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Follow Us on Instagram
            </h2>
            <p className="mt-2 text-gray-600">
              @yourstore • Tag us for a chance to be featured
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {[...Array(6)].map((_, index) => (
              <motion.a
                key={index}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="relative group overflow-hidden"
                whileHover={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <div className="aspect-square">
                  <img
                    src={`/placeholder.svg?height=200&width=200&text=Instagram+${index + 1}`}
                    alt={`Instagram post ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>View</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section> */}

      {/* 14. Newsletter Subscription
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-300 mb-8">
              Stay updated with our latest products, exclusive offers, and
              promotions. Subscribe now and get 10% off your first order!
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-400 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>
        </div>
      </section> */}

      {/* 15. Call to Action */}
      <section className="py-16 bg-gray-900 text-white mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-8">
              Explore our wide range of products and find exactly what you&apos;re
              looking for.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/products"
                className="px-8 py-3 bg-white text-orange-600 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full text-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

