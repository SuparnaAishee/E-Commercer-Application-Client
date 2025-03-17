"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      id: 1,
      title: "Apple MacBook Pro M3",
      subtitle: "Power Meets Innovation",
      description:
        "Ultra-fast performance with the latest M3 chip, Liquid Retina XDR display, and all-day battery life.",
      price: 499,
      image:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1742070134/1883634_3-removebg-preview_qnvgny.png",
    },
    {
      id: 2,
      title: "Sony WH-1000XM5",
      subtitle: "Unparalleled Sound Experience",
      description:
        "Industry-leading noise cancellation headphones with crystal-clear audio and up to 30 hours of battery life.",
      price: 79,
      image:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1742070162/360-RA-category-icon-20221202_f8g9wj.png",
    },
    {
      id: 3,
      title: "Ninja Foodi Smart Grill",
      subtitle: "Cook Like a Pro",
      description:
        "Grill, air fry, roast, and bake all in one with smart temperature control.",
      price: 99,
      image:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1742070616/ninja-foodi-max-health-grill-and-air-fryer-grey-and-silver-or-ag551uk-did-electrical-2_ed7fe3b4-c9bc-4b8a-b3bf-6e822612e1c6_600x_nnlt80-removebg-preview_avsuia.png",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-6 px-4 md:px-6 lg:pr-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr_380px]">
          {/* Main Slider */}
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[430px] w-full lg:w-[1000px] overflow-hidden rounded bg-gray-100 shadow-md">
            {/* Slider Track */}
            <div className="h-full w-full">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 h-full w-full transform transition-all duration-500 ease-in-out ${
                    index === currentSlide
                      ? "translate-x-0 opacity-100"
                      : index < currentSlide
                        ? "-translate-x-full opacity-0"
                        : "translate-x-full opacity-0"
                  }`}
                >
                  <div className="grid h-full w-full grid-cols-1 items-center p-4 sm:p-6 md:p-8 md:grid-cols-2">
                    <div className="space-y-2 sm:space-y-3 md:space-y-4 pr-2 md:pr-4">
                      <p className="text-xs sm:text-sm font-medium text-blue-500">
                        {slide.subtitle}
                      </p>
                      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        {slide.title} 2nd Edition
                      </h2>
                      <p className="text-sm md:text-base text-gray-600 hidden sm:block">
                        {slide.description}
                      </p>
                      <Link
                        href="#"
                        className="group mt-2 inline-flex items-center rounded bg-orange-500 px-4 sm:px-6 py-1 sm:py-2 text-sm md:text-base text-white transition-all hover:bg-orange-600"
                      >
                        Shop Now
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transform transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </Link>
                    </div>
                    <div className="relative flex h-full items-center justify-center">
                      <div className="absolute right-0 top-4 sm:top-8 z-10 rounded-full bg-blue-500 px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-xl font-bold text-white">
                        ${slide.price}
                      </div>
                      <div className="relative h-32 w-32 sm:h-40 sm:w-40 md:h-56 md:w-56 lg:h-64 lg:w-64">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.title}
                          fill
                          className="object-contain"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-colors ${
                    currentSlide === index ? "bg-orange-500" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1 sm:p-2 text-gray-800 shadow-sm transition-all hover:bg-white hover:shadow-md"
              aria-label="Previous slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/80 p-1 sm:p-2 text-gray-800 shadow-sm transition-all hover:bg-white hover:shadow-md"
              aria-label="Next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
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
            </button>
          </div>

          {/* Side Products */}
          <div className="flex flex-col gap-4 w-full lg:w-[400px]">
            {/* Phillips Mixer */}
            <div className="group relative h-[180px] sm:h-[200px] md:h-[220px] w-full overflow-hidden rounded bg-orange-300 p-4 sm:p-6 shadow-md transition-transform hover:scale-[1.02]">
              <div className="flex h-full items-center justify-between">
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-xs sm:text-sm font-medium text-black">
                    summer sells
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Phillips Mixer Grinder
                  </h3>
                  <Link
                    href="#"
                    className="group mt-1 sm:mt-2 inline-flex items-center rounded bg-black px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-white transition-all hover:bg-black"
                  >
                    Shop Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 transform transition-transform group-hover:scale-105 group-hover:rotate-3">
                  <Image
                    src="https://pngfre.com/wp-content/uploads/Mixer-Grinder-2.png"
                    alt="mixture"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Beauty Products */}
            <div className="group relative h-[160px] sm:h-[180px] md:h-[195px] w-full overflow-hidden rounded bg-gray-100 p-4 sm:p-6 shadow-md transition-transform hover:scale-[1.02]">
              <div className="flex h-full items-center justify-between">
                <div className="space-y-1 sm:space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Affordable Beauty Products
                  </h3>
                  <Link
                    href="#"
                    className="group mt-1 sm:mt-2 inline-flex items-center rounded bg-orange-500 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base text-white transition-all hover:bg-orange-600"
                  >
                    Shop Now
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="relative h-28 w-full sm:h-32 md:h-40 transform transition-transform group-hover:scale-105 group-hover:rotate-3">
                  <Image
                    src="https://png.pngtree.com/png-clipart/20250106/original/pngtree-cosmetics-beauty-products-mockup-png-image_19401775.png"
                    alt="Beauty Products"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// "use client";

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// import PromoSection from "./banner1";
// import PromoSection2 from "./banner2";
// import PromoSection3 from "./banner3";

// const Hero = () => {
//   return (
//     <div className="w-full">
//       <div className="w-full flex items-center">
//         {/* Slider main container */}
//         <Swiper
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           modules={[Autoplay, Pagination, Navigation]}
//           className="mySwiper"
//         >
//           <SwiperSlide>
//            <PromoSection/>
//           </SwiperSlide>
//           <SwiperSlide>
//             <PromoSection2/>
//           </SwiperSlide>
//           <SwiperSlide>
//             <PromoSection3 />
//           </SwiperSlide>
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default Hero;

// "use client";

// import img from "@/src/assets/img";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const Hero = () => {
//   return (
//     <div className="w-full">
//       <div className="w-full flex items-center">
//         {/* Slider main container */}
//         <Swiper
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           modules={[Autoplay, Pagination, Navigation]}
//           className="mySwiper"
//         >
//           <SwiperSlide>
//             <div className="bg-[#7cc8f8ba] ">
//               <div className="container">
//                 <div className="sm:flex items-center justify-center">
//                   <div className="w-full sm:w-1/2 pr-3">
//                     <div className="max-w-full py-24 lg:py-28 lg:pl-8 xl:pl-[95px] text-center sm:text-left">
//                       <p className="text-base mb-2 text-secondary">
//                         Affordable style for every ocassion
//                       </p>
//                       <h1 className="text-[36px] sm:text-[29px] md:text-[36px] xl:text-[40px] leading-10 text-secondary font-medium mb-4">
//                        FASHION FORWARD
//                       </h1>
//                       <div className="mb-1 leading-[22px] font-medium">
//                         <span className="text-primary mr-1">up to 70% off</span>
//                         {/* <span className="text-sm line-through text-[#687188]">
//                           $550.45
//                         </span> */}
//                       </div>
//                       <div className="mt-[30px]">
//                         <Link className="primary-btn" href="#">
//                           SHOP NOW
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="pl-3 w-1/2 hidden sm:block">
//                     <div className="w-full flex items-center justify-end lg:justify-center">
//                       <Image
//                         height={480}
//                         width={280}
//                         src={img.hero1}
//                         className="max-h-[280px] object-right"
//                         alt="phone"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className=" bg-[#FFDADF] ">
//               <div className="container">
//                 <div className="sm:flex items-center justify-center">
//                   <div className="w-full sm:w-1/2 px-3">
//                     <div className="max-w-full py-24 lg:py-28 lg:pl-8  text-center sm:text-left">
//                       <p className="text-base mb-2 text-secondary">
//                         Get up to 50% off Today only
//                       </p>
//                       <h1 className="text-[36px] sm:text-[29px] md:text-[36px] xl:text-[40px] leading-10 text-secondary font-medium mb-4">
//                         Skin Care Package{" "}
//                       </h1>
//                       <div className="mb-1 leading-[22px] font-medium">
//                         <span className="text-primary mr-1">$450.00</span>
//                         <span className="text-sm line-through text-[#687188]">
//                           $550.45
//                         </span>
//                       </div>
//                       <div className="mt-[30px]">
//                         <Link className="primary-btn" href="#">
//                           SHOP NOW
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="px-3 sm:w-1/2 hidden sm:block">
//                     <div className="w-full flex items-center justify-end lg:justify-center">
//                       <Image
//                         height={380}
//                         width={380}
//                         src={img.hero2}
//                         className="max-h-[280px] object-right"
//                         alt="phone"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>

//           <SwiperSlide>
//             <div className="bg-[#CCCCCC]">
//               <div className="container">
//                 <div className="sm:flex items-center justify-center">
//                   <div className="w-full sm:w-1/2 px-3">
//                     <div className="max-w-full py-24 lg:py-28 lg:pl-8 xl:pl-[95px] text-center sm:text-left">
//                       <p className="text-base mb-2 text-secondary">
//                         Get up to 50% off Today only
//                       </p>
//                       <h1 className="text-[36px] sm:text-[29px] md:text-[36px] xl:text-[40px] leading-10 text-secondary font-medium mb-4">
//                         iPhone 12 Pro Max{" "}
//                       </h1>
//                       <div className="mb-1 leading-[22px] font-medium">
//                         <span className="text-primary mr-1">$450.00</span>
//                         <span className="text-sm line-through text-[#687188]">
//                           $550.45
//                         </span>
//                       </div>
//                       <div className="mt-[30px]">
//                         <Link className="primary-btn" href="#">
//                           SHOP NOW
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="px-3 sm:w-1/2 hidden sm:block">
//                     <div className="w-full flex items-center justify-end lg:justify-center">
//                       <Image
//                         height={280}
//                         width={280}
//                         src={img.hero3}
//                         className="max-h-[280px] object-right"
//                         alt="phone"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className="bg-[#7cc8f8ba] ">
//               <div className="container">
//                 <div className="sm:flex items-center justify-center">
//                   <div className="w-full sm:w-1/2 pr-3">
//                     <div className="max-w-full py-24 lg:py-28 lg:pl-8 xl:pl-[95px] text-center sm:text-left">
//                       <p className="text-base mb-2 text-secondary">
//                         Get up to 50% off Today only
//                       </p>
//                       <h1 className="text-[36px] sm:text-[29px] md:text-[36px] xl:text-[40px] leading-10 text-secondary font-medium mb-4">
//                         Apple iPhone XR
//                       </h1>
//                       <div className="mb-1 leading-[22px] font-medium">
//                         <span className="text-primary mr-1">$450.00</span>
//                         <span className="text-sm line-through text-[#687188]">
//                           $550.45
//                         </span>
//                       </div>
//                       <div className="mt-[30px]">
//                         <Link className="primary-btn" href="#">
//                           SHOP NOW
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="pl-3 w-1/2 hidden sm:block">
//                     <div className="w-full flex items-center justify-end lg:justify-center">
//                       <Image
//                         height={280}
//                         width={280}
//                         src={img.iPhoneXR}
//                         className="max-h-[280px] object-right"
//                         alt="phone"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//           <SwiperSlide>
//             <div className=" bg-[#FFDADF]">
//               <div className="container">
//                 <div className="sm:flex items-center justify-center">
//                   <div className="w-full sm:w-1/2 px-3">
//                     <div className="max-w-full py-24 lg:py-28 lg:pl-8  text-center sm:text-left">
//                       <p className="text-base mb-2 text-secondary">
//                         Get up to 50% off Today only
//                       </p>
//                       <h1 className="text-[36px] sm:text-[29px] md:text-[36px] xl:text-[40px] leading-10 text-secondary font-medium mb-4">
//                         iPhone 11 Pro Max{" "}
//                       </h1>
//                       <div className="mb-1 leading-[22px] font-medium">
//                         <span className="text-primary mr-1">$450.00</span>
//                         <span className="text-sm line-through text-[#687188]">
//                           $550.45
//                         </span>
//                       </div>
//                       <div className="mt-[30px]">
//                         <Link className="primary-btn" href="#">
//                           SHOP NOW
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="px-3 sm:w-1/2 hidden sm:block">
//                     <div className="w-full flex items-center justify-end lg:justify-center">
//                       <Image
//                         height={280}
//                         width={280}
//                         src={img.iPhoneXR}
//                         className="max-h-[280px] object-right"
//                         alt="phone"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default Hero;
