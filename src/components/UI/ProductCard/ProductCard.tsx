"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter
import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { Heart, ShoppingCart, Eye, Star, CheckCircle2 } from "lucide-react";

interface ProductCardProps {
  product: any;
  viewMode?: "grid3" | "grid2" | "list";
}

const ProductCard = ({ product, viewMode = "grid3" }: ProductCardProps) => {
  const router = useRouter(); // Initialize the router
  const [isHovered, setIsHovered] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddedToCart(true);

    // Reset after animation
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);

    // Add to cart logic here
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);

    // Wishlist logic here
  };

const handleQuickView = (e: React.MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  router.push(`/products/${product.id}`); // Update this path
};

  // Calculate discount percentage
  const discountPercentage = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Check if product is on sale
  const isOnSale = product.oldPrice && product.oldPrice > product.price;

  // Check if product is new (example logic - adjust as needed)
  const isNew =
    new Date(product.createdAt).getTime() >
    Date.now() - 30 * 24 * 60 * 60 * 1000;

  if (viewMode === "list") {
    return (
      <Card
        as={Link}
        href={`/products/${product.id}`}
        className="overflow-hidden hover:shadow-lg transition-shadow"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="relative md:w-1/3">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.thumbnail || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              />

              {/* Product badges */}
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
          </div>

          <div className="p-4 md:p-6 flex-1 flex flex-col">
            <div className="mb-2">
              {product.category && (
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  {product.category}
                </span>
              )}
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-1 mt-1">
                {product.name}
              </h3>
            </div>

            <p className="text-gray-600 line-clamp-2 mb-4">
              {product.description}
            </p>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${star <= (product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">
                ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            <div className="mt-auto">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.oldPrice}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  color="primary"
                  className="flex-1"
                  startContent={
                    isAddedToCart ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <ShoppingCart size={18} />
                    )
                  }
                  onClick={handleAddToCart}
                >
                  {isAddedToCart ? "Added" : "Add to Cart"}
                </Button>

                <Tooltip
                  content={
                    isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                  }
                >
                  <Button
                    isIconOnly
                    variant="flat"
                    color={isWishlisted ? "danger" : "default"}
                    onClick={handleToggleWishlist}
                  >
                    <Heart
                      size={18}
                      className={isWishlisted ? "fill-current" : ""}
                    />
                  </Button>
                </Tooltip>

                <Tooltip content="Quick View">
                  <Button isIconOnly variant="flat" onClick={handleQuickView}>
                    <Eye size={18} />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      as={Link}
      href={`/products/${product.id}`}
      className="overflow-hidden hover:shadow-lg transition-shadow"
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
            style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
          />

          {/* Product badges */}
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
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity"
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
                className={`${star <= (product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
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

export default ProductCard;
// "use client";

// import type React from "react";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   Chip,
//   Tooltip,
// } from "@nextui-org/react";
// import { Heart, ShoppingCart, Eye, Star, CheckCircle2 } from "lucide-react";

// interface ProductCardProps {
//   product: any;
//   viewMode?: "grid3" | "grid2" | "list";
// }

// const ProductCard = ({ product, viewMode = "grid3" }: ProductCardProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const [isAddedToCart, setIsAddedToCart] = useState(false);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const handleAddToCart = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsAddedToCart(true);

//     // Reset after animation
//     setTimeout(() => {
//       setIsAddedToCart(false);
//     }, 2000);

//     // Add to cart logic here
//   };

//   const handleToggleWishlist = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsWishlisted(!isWishlisted);

//     // Wishlist logic here
//   };

//   const handleQuickView = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();

//     // Quick view logic here
//   };

//   // Calculate discount percentage
//   const discountPercentage = product.oldPrice
//     ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//     : 0;

//   // Check if product is on sale
//   const isOnSale = product.oldPrice && product.oldPrice > product.price;

//   // Check if product is new (example logic - adjust as needed)
//   const isNew =
//     new Date(product.createdAt).getTime() >
//     Date.now() - 30 * 24 * 60 * 60 * 1000;

//   if (viewMode === "list") {
//     return (
//       <Card
//         as={Link}
//         href={`/product/${product.id}`}
//         className="overflow-hidden hover:shadow-lg transition-shadow"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         <div className="flex flex-col md:flex-row">
//           <div className="relative md:w-1/3">
//             <div className="aspect-square relative overflow-hidden">
//               <Image
//                 src={product.thumbnail || "/placeholder.svg"}
//                 alt={product.name}
//                 fill
//                 className="object-cover transition-transform duration-500"
//                 style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
//               />

//               {/* Product badges */}
//               <div className="absolute top-2 left-2 flex flex-col gap-1">
//                 {isNew && (
//                   <Chip color="primary" size="sm" variant="flat">
//                     New
//                   </Chip>
//                 )}
//                 {isOnSale && (
//                   <Chip color="danger" size="sm" variant="flat">
//                     -{discountPercentage}%
//                   </Chip>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="p-4 md:p-6 flex-1 flex flex-col">
//             <div className="mb-2">
//               {product.category && (
//                 <span className="text-xs text-gray-500 uppercase tracking-wider">
//                   {product.category}
//                 </span>
//               )}
//               <h3 className="text-xl font-semibold text-gray-800 line-clamp-1 mt-1">
//                 {product.name}
//               </h3>
//             </div>

//             <p className="text-gray-600 line-clamp-2 mb-4">
//               {product.description}
//             </p>

//             <div className="flex items-center mb-4">
//               <div className="flex items-center">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     size={16}
//                     className={`${star <= (product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-gray-500 ml-2">
//                 ({product.reviews?.length || 0} reviews)
//               </span>
//             </div>

//             <div className="mt-auto">
//               <div className="flex items-center gap-2 mb-4">
//                 <span className="text-xl font-bold text-gray-900">
//                   ${product.price}
//                 </span>
//                 {product.oldPrice && (
//                   <span className="text-sm text-gray-500 line-through">
//                     ${product.oldPrice}
//                   </span>
//                 )}
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   color="primary"
//                   className="flex-1"
//                   startContent={
//                     isAddedToCart ? (
//                       <CheckCircle2 size={18} />
//                     ) : (
//                       <ShoppingCart size={18} />
//                     )
//                   }
//                   onClick={handleAddToCart}
//                 >
//                   {isAddedToCart ? "Added" : "Add to Cart"}
//                 </Button>

//                 <Tooltip
//                   content={
//                     isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
//                   }
//                 >
//                   <Button
//                     isIconOnly
//                     variant="flat"
//                     color={isWishlisted ? "danger" : "default"}
//                     onClick={handleToggleWishlist}
//                   >
//                     <Heart
//                       size={18}
//                       className={isWishlisted ? "fill-current" : ""}
//                     />
//                   </Button>
//                 </Tooltip>

//                 <Tooltip content="Quick View">
//                   <Button isIconOnly variant="flat" onClick={handleQuickView}>
//                     <Eye size={18} />
//                   </Button>
//                 </Tooltip>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Card>
//     );
//   }

//   return (
//     <Card
//       as={Link}
//       href={`/product/${product.id}`}
//       className="overflow-hidden hover:shadow-lg transition-shadow"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="relative">
//         <div className="aspect-square relative overflow-hidden">
//           <Image
//             src={product.thumbnail || "/placeholder.svg"}
//             alt={product.name}
//             fill
//             className="object-cover transition-transform duration-500"
//             style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
//           />

//           {/* Product badges */}
//           <div className="absolute top-2 left-2 flex flex-col gap-1">
//             {isNew && (
//               <Chip color="primary" size="sm" variant="flat">
//                 New
//               </Chip>
//             )}
//             {isOnSale && (
//               <Chip color="danger" size="sm" variant="flat">
//                 -{discountPercentage}%
//               </Chip>
//             )}
//           </div>
//         </div>

//         {/* Quick action buttons */}
//         <motion.div
//           className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: isHovered ? 1 : 0 }}
//         >
//           <div className="flex gap-2">
//             <Tooltip content="Quick View">
//               <Button
//                 isIconOnly
//                 color="default"
//                 variant="flat"
//                 className="bg-white"
//                 onClick={handleQuickView}
//               >
//                 <Eye size={18} />
//               </Button>
//             </Tooltip>

//             <Tooltip
//               content={
//                 isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
//               }
//             >
//               <Button
//                 isIconOnly
//                 color={isWishlisted ? "danger" : "default"}
//                 variant="flat"
//                 className="bg-white"
//                 onClick={handleToggleWishlist}
//               >
//                 <Heart
//                   size={18}
//                   className={isWishlisted ? "fill-current" : ""}
//                 />
//               </Button>
//             </Tooltip>
//           </div>
//         </motion.div>
//       </div>

//       <CardBody className="p-4">
//         <div className="mb-1">
//           {product.category && (
//             <span className="text-xs text-gray-500 uppercase tracking-wider">
//               {product.category}
//             </span>
//           )}
//         </div>

//         <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
//           {product.name}
//         </h3>

//         <div className="flex items-center mt-1 mb-2">
//           <div className="flex items-center">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 size={14}
//                 className={`${star <= (product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
//               />
//             ))}
//           </div>
//           <span className="text-xs text-gray-500 ml-2">
//             ({product.reviews?.length || 0})
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <span className="text-lg font-bold text-gray-900">
//             ${product.price}
//           </span>
//           {product.oldPrice && (
//             <span className="text-sm text-gray-500 line-through">
//               ${product.oldPrice}
//             </span>
//           )}
//         </div>
//       </CardBody>

//       <CardFooter className="pt-0">
//         <Button
//           color="primary"
//           className="w-full"
//           startContent={
//             isAddedToCart ? (
//               <CheckCircle2 size={18} />
//             ) : (
//               <ShoppingCart size={18} />
//             )
//           }
//           onClick={handleAddToCart}
//         >
//           {isAddedToCart ? "Added to Cart" : "Add to Cart"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default ProductCard;
