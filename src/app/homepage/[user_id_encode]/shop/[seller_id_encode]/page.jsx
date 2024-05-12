"use client";
import React from "react";
import "./page.css";
import { useState, useEffect } from "react";
import Product_cart from "@/components/product_cart/product_cart";
export default function Seller_shop({ params }) {
  const { user_id_encode, seller_id_encode } = params;
  const user_id = decodeURIComponent(user_id_encode);
  const seller_id = decodeURIComponent(seller_id_encode);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`/api/user/shop?seller_id=${seller_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const transformedData = data.map((item) => ({
          productImg: item.First_Image,
          sellerImg: "/user_icon.png", // replace with actual data if available
          sellerName: item.Shop_name, // replace with actual data if available
          productName: item.Product_title,
          location: "北海道日高地方", // replace with actual data if available
          price: item.First_Option_Price,
          unit: "1袋1kg", // replace with actual data if available
          product_id: item.Product_ID,
          isDiscount: false, // replace with actual data if available
          percentage: 0, // replace with actual data if available
        }));
        setProducts(transformedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="listProductOfShopContainer">
      {products.map((product, index) => (
        <Product_cart key={index} product={product} userID={user_id} />
      ))}
    </div>
  );
}
