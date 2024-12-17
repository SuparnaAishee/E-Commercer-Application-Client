"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import PromoSection from "./banner1";
import PromoSection2 from "./banner2";
import PromoSection3 from "./banner3";



const Hero = () => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center">
        {/* Slider main container */}
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
           <PromoSection/>
          </SwiperSlide>
          <SwiperSlide>
            <PromoSection2/>
          </SwiperSlide>
          <SwiperSlide>
            <PromoSection3 />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;

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
