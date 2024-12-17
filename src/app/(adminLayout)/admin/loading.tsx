/* eslint-disable @next/next/no-img-element */
import img from "@/src/assets/img";
import Image from "next/image";
import React from "react";

const loading = () => {
  return (
    <div className="fixed inset-0 bg-white z-30 opacity-100 flex items-center justify-center">
      <Image
        height={500}
        width={500}
        src={img.loader}
        alt="Loader"
        className="w-[30rem] h-[30rem] object-cover"
      />
    </div>
  );
};

export default loading;
