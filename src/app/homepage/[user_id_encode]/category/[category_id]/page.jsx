"use client";
import { useEffect, useState } from "react";
import "./category.css";
import Product_cart from "@/components/product_cart/product_cart";
export default function Page({ params }) {
  const { user_id_encode, category_id } = params;
  const user_id = decodeURIComponent(user_id_encode);
  const [products, setProducts] = useState([]);
  const [number, setNumber] = useState("");

  useEffect(() => {
    fetch(`/api/user/category?category_id=${category_id}`)
      .then((response) => response.json())
      .then((data) => {
        setNumber(data.length);
        setProducts(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [category_id]);
  return (
    <div className="category_page">
      <h3 style={{ color: "black" }}>カテゴリ肉 の検索結果: {number}件</h3>
      <div className="category_product_container">
        {products.map((product, index) => (
          <Product_cart
            key={index}
            product={{
              productImg: product.images[0].Image_url,
              sellerImg: product.sellerInfo.Shop_image,
              sellerName: product.sellerInfo.Shop_name,
              productName: product.Product_title,
              location: "Location",
              price: product.First_Option_Price,
              unit: "Unit",
              product_id: product.Product_ID,
              isDiscount: false,
              percentage: 0,
            }}
            userID={user_id}
          />
        ))}
      </div>
    </div>
  );
}
