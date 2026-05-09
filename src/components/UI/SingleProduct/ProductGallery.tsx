"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { Heart } from "lucide-react";

type ProductGalleryProps = {
  images: string[];
  productName: string;
  isOnSale: boolean;
  discountPercentage: number;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
};

const ProductGallery = ({
  images,
  productName,
  isOnSale,
  discountPercentage,
  isWishlisted,
  onToggleWishlist,
}: ProductGalleryProps) => {
  const [activeImg, setActiveImg] = useState(0);
  const safeImages = images?.length ? images : ["/default-product.png"];

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full relative"
          >
            <Image
              src={safeImages[activeImg]}
              alt={productName}
              fill
              className="object-cover hover:scale-110 transition-transform duration-500"
              priority
            />

            <div className="absolute top-4 left-4 flex flex-col gap-1">
              {isOnSale && (
                <Chip color="danger" size="sm" variant="flat">
                  -{discountPercentage}%
                </Chip>
              )}
            </div>

            <Tooltip
              content={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Button
                isIconOnly
                color={isWishlisted ? "danger" : "default"}
                variant="flat"
                className="absolute top-4 right-4 bg-white"
                onClick={onToggleWishlist}
                aria-label="Toggle wishlist"
              >
                <Heart
                  className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </Button>
            </Tooltip>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {safeImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImg(index)}
            aria-label={`Show image ${index + 1}`}
            className={`relative min-w-[80px] h-20 rounded-lg overflow-hidden border-2 transition-all ${
              activeImg === index
                ? "border-primary ring-2 ring-primary/30"
                : "border-gray-200"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
