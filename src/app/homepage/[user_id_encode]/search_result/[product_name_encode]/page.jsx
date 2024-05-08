"use client";
import { useState } from "react";
import "./search_result.css";
import Product_cart from "@/components/product_cart/product_cart";
export default function Page({ params }) {
  const { user_id_encode, product_name_encode } = params;
  const user_id = decodeURIComponent(user_id_encode);
  const product_name = decodeURIComponent(product_name_encode);
  const [num_of_results, set_num_of_results] = useState(34);
  const [products, setProducts] = useState([
    {
      productImg: "/product_1.webp",
      sellerImg: "/user_icon.png",
      sellerName: "野比のび太",
      productName: "赤いリンゴ",
      location: "北海道日高地方",
      price: "100円",
      unit: "1袋1kg",
      product_id: "product_id",
      isDiscount: false,
      percentage: 0,
    },
    {
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
    },
  ]);
  return (
    <div className="search_result_container">
      <h3>
        Result for {product_name} ( {num_of_results} results)
      </h3>
      <div className="search_result_list">
        {Array.from({ length: 20 }, (_, i) => (
          <Product_cart key={i} product={products[i % 2]} userID={user_id} />
        ))}
      </div>
    </div>
  );
}
