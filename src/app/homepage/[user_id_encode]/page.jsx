"use client";
import React, { useRef } from "react";
import AdvertisementCart from "@/components/advertisement_cart/advertisement_cart";
import Product_cart from "@/components/product_cart/product_cart";
import CategoryCart from "@/components/category_cart/category_cart";
import "./homepage.css";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Page({ params }) {
  const { user_id_encode } = params;
  const productBestSellerListRef = useRef();
  const productSaleListRef = useRef();
  const advetisementListRef = useRef();

  const user_id = decodeURIComponent(user_id_encode);
  const [advertisements, setAdvertisement] = useState([
    {
      image: "/ad1.jpeg",
      product_id: "product_1",
    },
    {
      image: "/ad2.jpeg",
      product_id: "product_2",
    },
    {
      image: "/ad3.jpeg",
      product_id: "product_3",
    },
    {
      image: "/ad4.jpeg",
      product_id: "product_4",
    },
    {
      image: "/ad5.jpeg",
      product_id: "product_5",
    },
    {
      image: "/ad6.jpeg",
      product_id: "product_6",
    },
  ]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  useEffect(() => {
    fetch("/api/user/products") // replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        // transform the data into the format you need
        const transformedData = data.map((item) => ({
          productImg: item.First_Image,
          sellerImg: "/user_icon.png", // replace with actual data if available
          sellerName: item.Seller_ID, // replace with actual data if available
          productName: item.Product_title,
          location: "北海道日高地方", // replace with actual data if available
          price: item.First_Option_Price,
          unit: "1袋1kg", // replace with actual data if available
          product_id: item.Product_ID,
          isDiscount: false, // replace with actual data if available
          percentage: 0, // replace with actual data if available
        }));

        setBestSellerProducts(transformedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const [saleProducts, setSaleProducts] = useState({
    productImg: "/product_2.webp",
    sellerImg: "/user_icon.png",
    sellerName: "野比のび太",
    productName: "赤いリンゴ",
    location: "北海道日高地方",
    price: "100円",
    unit: "1袋1kg",
    product_id: "product_id",
    isDiscount: true,
    percentage: 50,
  });

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft - 400, // adjust this as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollTo({
        left: ref.current.scrollLeft + 400, // adjust this as needed
        behavior: "smooth",
      });
    }
  };
  const scrollLeftAd = () => {
    if (advetisementListRef.current) {
      advetisementListRef.current.scrollTo({
        left: advetisementListRef.current.scrollLeft - 400, // adjust this as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRightAd = () => {
    if (advetisementListRef.current) {
      advetisementListRef.current.scrollTo({
        left: advetisementListRef.current.scrollLeft + 400, // adjust this as needed
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="homepage_container">
      <div className="big_advertisement_container">
        <button onClick={scrollLeftAd}>
          <Image
            src="/icon_arr_left.png"
            alt="left_arrow"
            width={30}
            height={50}
          />
        </button>
        <div className="advertisement_container" ref={advetisementListRef}>
          {advertisements.map((advertisement, index) => (
            <AdvertisementCart key={index} advertisement={advertisement} />
          ))}
        </div>
        <button onClick={scrollRightAd}>
          <Image
            src="/icon_arr_right.png"
            alt="left_arrow"
            width={30}
            height={50}
          />
        </button>
      </div>
      <div className="best_seller_container">
        <p className="best_seller_title">ベストセラー</p>
        <div className="big_best_seller_container">
          <button
            onClick={() => scrollLeft(productBestSellerListRef)}
            className="scroll_btn"
          >
            <Image
              src="/icon_arr_left.png"
              alt="left_arrow"
              width={30}
              height={50}
            />
          </button>
          <div className="product_list" ref={productBestSellerListRef}>
            {bestSellerProducts.map((product, index) => (
              <Product_cart key={index} product={product} userID={user_id} />
            ))}
          </div>
          <button
            onClick={() => {
              scrollRight(productBestSellerListRef);
            }}
            className="scroll_btn"
          >
            <Image
              src="/icon_arr_right.png"
              alt="left_arrow"
              width={30}
              height={50}
            />
          </button>
        </div>
      </div>
      {/* <div className="best_seller_container">
        <p className="best_seller_title">割引商品</p>
        <div className="big_best_seller_container">
          <button
            onClick={() => {
              scrollLeft(productSaleListRef);
            }}
            className="scroll_btn"
          >
            <Image
              src="/icon_arr_left.png"
              alt="left_arrow"
              width={30}
              height={50}
            />
          </button>
          <div className="product_list" ref={productSaleListRef}>
            <Product_cart product={saleProducts} userID={user_id} />
            <Product_cart product={saleProducts} userID={user_id} />
            <Product_cart product={saleProducts} userID={user_id} />
            <Product_cart product={saleProducts} userID={user_id} />
            <Product_cart product={saleProducts} userID={user_id} />
            <Product_cart product={saleProducts} userID={user_id} />
            <Product_cart product={saleProducts} userID={user_id} />
            <Product_cart product={saleProducts} userID={user_id} />
            <Product_cart product={saleProducts} userID={user_id} />
            <Product_cart product={saleProducts} userID={user_id} />
          </div>
          <button
            onClick={() => {
              scrollRight(productSaleListRef);
            }}
            className="scroll_btn"
          >
            <Image
              src="/icon_arr_right.png"
              alt="left_arrow"
              width={30}
              height={50}
            />
          </button>
        </div>
      </div> */}
      {/* <div className="category_container">
        <p className="category_title">Shop by category</p>
        <div className="category_list">
          <CategoryCart
            category={{ img: "/fish.jpeg", name: "Fish" }}
            userID={user_id}
          />
          <CategoryCart
            category={{ img: "/fish.jpeg", name: "Fish" }}
            userID={user_id}
          />
          <CategoryCart
            category={{ img: "/fish.jpeg", name: "Fish" }}
            userID={user_id}
          />
          <CategoryCart
            category={{ img: "/fish.jpeg", name: "Fish" }}
            userID={user_id}
          />
          <CategoryCart
            category={{ img: "/fish.jpeg", name: "Fish" }}
            userID={user_id}
          />
          <CategoryCart
            category={{ img: "/fish.jpeg", name: "Fish" }}
            userID={user_id}
          />
          <CategoryCart
            category={{ img: "/fish.jpeg", name: "Fish" }}
            userID={user_id}
          />
          <CategoryCart
            category={{ img: "/fish.jpeg", name: "Fish" }}
            userID={user_id}
          />
          <CategoryCart
            category={{ img: "/fish.jpeg", name: "Fish" }}
            userID={user_id}
          />
        </div>
      </div> */}
    </div>
  );
}
