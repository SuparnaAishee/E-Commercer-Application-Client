"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Button,
  Chip,
  Tooltip,
  Card,
  CardBody,
  CardFooter,
} from "@nextui-org/react";
import { Heart, ShoppingCart, Eye, CheckCircle2, Star } from "lucide-react";

interface FlashSaleProductCardProps {
  product: any;
}

const FlashSaleProductCard = ({ product }: FlashSaleProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddedToCart(true);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const isOnSale = product.oldPrice && product.oldPrice > product.price;

  const isNew =
    new Date(product.createdAt).getTime() >
    Date.now() - 30 * 24 * 60 * 60 * 1000;

  return (
    <Card
      as={Link}
      href={`/product/${product.id}`}
      className="overflow-hidden rounded-lg shadow-lg bg-gradient-to-br from-yellow-400 to-red-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
          />

          {/* Product Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {isNew && (
              <Chip color="primary" size="sm" variant="flat">
                New
              </Chip>
            )}
            {isOnSale && (
              <Chip color="danger" size="sm" variant="flat">
                -{discountPercentage}%
              </Chip>
            )}
          </div>
        </div>

        {/* Quick action buttons */}
        <motion.div
          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <div className="flex gap-2">
            <Tooltip content="Quick View">
              <Button
                isIconOnly
                color="default"
                variant="flat"
                className="bg-white"
                onClick={handleQuickView}
              >
                <Eye size={18} />
              </Button>
            </Tooltip>

            <Tooltip
              content={
                isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
              }
            >
              <Button
                isIconOnly
                color={isWishlisted ? "danger" : "default"}
                variant="flat"
                className="bg-white"
                onClick={handleToggleWishlist}
              >
                <Heart
                  size={18}
                  className={isWishlisted ? "fill-current" : ""}
                />
              </Button>
            </Tooltip>
          </div>
        </motion.div>
      </div>

      <CardBody className="p-4">
        <div className="mb-1">
          {product.category && (
            <span className="text-xs text-gray-500 uppercase tracking-wider">
              {product.category}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center mt-1 mb-2">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={14}
                className={`${
                  star <= (product.rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">
            ({product.reviews?.length || 0})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>
      </CardBody>

      <CardFooter className="pt-0">
        <Button
          color="primary"
          className="w-full"
          startContent={
            isAddedToCart ? (
              <CheckCircle2 size={18} />
            ) : (
              <ShoppingCart size={18} />
            )
          }
          onClick={handleAddToCart}
        >
          {isAddedToCart ? "Added to Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FlashSaleProductCard;
