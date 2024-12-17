"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/src/types";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useGetAllProducts } from "@/src/hooks/product";
import ProductCart from "../ProductCart/ProductCart";
import { useAddToCart, useGetMyCartProducts } from "@/src/hooks/cart";
import { toast } from "sonner";
import { useUser } from "@/src/context/user.provider";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { calculateDiscount } from "@/src/utils/calculateDiscount";

const SingleProduct = ({ product }: { product: IProduct }) => {
  const { user } = useUser();
  const router = useRouter();
  const { data: products } = useGetAllProducts([
    { name: "category", value: product?.category.name },
  ]);
  const { data: cartProduct, refetch: refetchCart } = useGetMyCartProducts();
  const { mutate: addToCart } = useAddToCart();
  const [activeImg, setActiveImg] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (product: IProduct) => {
    if (user?.email) {
      const isDifferentShop = cartProduct?.data?.find(
        (cart) => cart.product?.shopId !== product?.shopId
      );
      if (isDifferentShop) {
        Swal.fire({
          title: "Detect Different Shop",
          text: "Adding multiple shop product is not allowed! Replace the cart with the new product!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Replace",
        }).then((result) => {
          if (result.isConfirmed) {
            addToCart(
              { productId: product.id, quantity: 1, type: "replaceProduct" },
              {
                onSuccess(data) {
                  if (data?.success) {
                    refetchCart();
                    toast.success(data?.message);
                  } else {
                    toast.error(data?.message);
                  }
                },
              }
            );
          }
        });
      } else {
        addToCart(
          { productId: product.id, quantity: 1 },
          {
            onSuccess(data) {
              if (data?.success) {
                refetchCart();
                toast.success(data?.message);
              } else {
                toast.error(data?.message);
              }
            },
          }
        );
      }
    } else {
      Swal.fire({
        title: "Please login",
        text: "Please login to add product in cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-6">
          <div className="flex justify-center items-center">
            <Image
              height={500}
              width={500}
              style={{
                height: "auto",
                width: "auto",
              }}
              loading="lazy"
              alt="product"
              src={product?.images[activeImg]}
            />
          </div>

          <div className="pt-6">
            <Swiper
              slidesPerView={3}
              spaceBetween={10}
              modules={[Navigation]}
              className="mySwiper"
            >
              {product?.images.map((image, i) => (
                <SwiperSlide
                  key={i}
                  style={{ width: "111px", marginRight: "8px" }}
                >
                  {" "}
                  <div className="w-full h-[80px] flex justify-center items-center">
                    <Image
                      height={100}
                      width={100}
                      onClick={() => setActiveImg(i)}
                      loading="lazy"
                      alt="product"
                      className={`w-full h-full object-contain cursor-pointer border p-3 rounded-md ${
                        activeImg === i ? "border-rose-500" : ""
                      }`}
                      src={image}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <div className="product_info_wrapper">
            <div className="product_base_info">
              <h1 className="text-2xl sm:text-3xl uppercase">
                {product?.name}
              </h1>

              <div className="space-y-2 mt-4">
                <p>
                  <span className="font-medium pr-3">Quantity:</span>
                  <span className="font-medium">{product?.inventory}</span>
                </p>

                <p>
                  <span className="font-medium pr-3">Category:</span>
                  {product?.category?.name}
                </p>
                <p>
                  <span className="font-medium pr-3">Shop:</span>
                  <Link
                    className="underline text-rose-500"
                    href={`/shops/${product?.shopId}`}
                  >
                    {product?.shop?.shopName}
                  </Link>
                </p>
              </div>
              <div className="mt-3 flex gap-3 items-center overflow-hidden">
                {product?.isFlashSale ? (
                  <span className="text-2xl text-primary font-semibold">
                    {calculateDiscount(
                      product?.price,
                      product?.discount_percentage
                    ).toFixed(2)}
                  </span>
                ) : (
                  <span className="text-2xl text-primary font-semibold">
                    {product?.price}
                  </span>
                )}

                {product?.isFlashSale && (
                  <span className="line-through">
                    {(product?.price).toFixed(2)}
                  </span>
                )}
              </div>
              <div className="mt-2">
                <p>{product?.description}</p>
              </div>

              {/* <!-- quantity --> */}
              <div className="cart_qnty ms-md-auto">
                <p>Quantity</p>
                <div className="flex items-center  mt-1">
                  <div className="w-8 h-8 border hover:bg-[#E9E4E4] flex justify-center items-center cursor-pointer">
                    <button
                      onClick={() =>
                        setQuantity((prev) => (prev >= 2 ? prev - 1 : 1))
                      }
                    >
                      <FaMinus />
                    </button>
                  </div>
                  <div className="w-8 h-8 border flex justify-center items-center">
                    {quantity}
                  </div>
                  <div className="w-8 h-8 border hover:bg-[#E9E4E4] flex justify-center items-center cursor-pointer">
                    <button onClick={() => setQuantity((prev) => prev + 1)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- add to cart & wishlist --> */}
            <div className="flex gap-5 mt-6 border-b pb-5">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex gap-2 items-center border border-primary default_btn text-sm sm:text-base text-white hover:bg-white hover:text-rose-500 transition duration-300 px-2 sm:px-8 py-2 rounded uppercase group"
              >
                <span className="text-white group-hover:text-rose-500">
                  <IoCartOutline size={20} />
                </span>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Review */}
      <div className="container pt-14">
        <div className="flex items-start justify-between mb-[30px]">
          <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary">
            Product Reviews
          </h2>
          <div className="pt-2">
            <Link
              href="/products"
              className="text-[15px] font-medium text-primary flex items-center gap-1"
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
        {product?.reviews?.map((review) => {
          return (
            <div key={review?.id} className="flex gap-5 border-b pb-5">
              {review?.user?.profilePhoto && (
                <div>
                  <Image
                    height={100}
                    width={100}
                    loading="lazy"
                    src={review?.user?.profilePhoto}
                    alt="user"
                  />
                </div>
              )}

              {/* <!-- content --> */}
              <div>
                <h5>by {review?.user?.name}</h5>
                {/* <!-- rating --> */}
                <div className="flex mt-2">
                  {[review?.rating]?.map((rating, i) => {
                    return (
                      <span key={i} className="text-[#F6BC3E]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21L12 17.27z"
                          ></path>
                        </svg>
                      </span>
                    );
                  })}
                </div>
                <div className="text-xs mt-2">{review?.createdAt}</div>
                <p className="mt-2">{review?.comment}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Related product*/}
      <div className="container pt-14">
        <div className="flex items-start justify-between mb-[30px]">
          <h2 className="text-[22px] sm:text-[32px] font-medium text-secondary">
            Related Product
          </h2>
          <div className="pt-2">
            <Link
              href="/products"
              className="text-[15px] font-medium text-primary flex items-center gap-1"
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.data
            ?.slice(0, 4)
            ?.map((product) => (
              <ProductCart key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
