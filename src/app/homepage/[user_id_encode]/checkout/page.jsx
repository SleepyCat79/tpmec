"use client";
import "./checkout.css";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function CheckoutPage({ params }) {
  const route = useRouter();
  const user_id_encode = params.user_id_encode;
  const user_id = decodeURIComponent(user_id_encode);
  /// use userID to get the data that user have checkout
  const [cart, setCart] = useState({
    shop: [
      {
        shop_id: "shopID_1",
        shop_name: "Shop 1",
        check: false,
        product: [
          {
            product_id: "productID_1",
            product_name: "Product 1",
            price: 100000,
            quantity: 1,
            total: 100000,
            product_img: "/fish.jpeg",
            type: "type_1",
          },
        ],
        note: "",
        delivery_company: "GHTK",
      },
      {
        shop_id: "shopID_2",
        shop_name: "Shop 2",
        product: [
          {
            product_id: "productID_2",
            product_name: "Product 2",
            price: 300000,
            quantity: 2,
            total: 600000,
            type: "type_2",
            product_img: "/ad2.jpeg",
          },
          {
            product_id: "productID_3",
            product_name: "Product 3",
            price: 100000,
            quantity: 2,
            total: 200000,
            type: "type_3",
            product_img: "/ad3.jpeg",
          },
        ],
        note: "",
        delivery_company: "GHN",
      },
    ],
  });
  const user_information = {
    user_name: "Nguyen Viet Hung",
    user_phone: "0798944343",
    user_address: [
      "13/19 , Khu Phố 6, Phường Tam Hiệp, Phường Tam Hiệp, Thành Phố Biên Hòa, Đồng Nai",
      "79/38A tổ 21 khu phố 1 phường Tân Hiệp Biên Hoà Dồng Nai Việt Nam",
    ],
  };
  function calculateTotalPrice() {
    let total = 0;
    cart.shop.map((shop) => {
      total += shop.product.reduce((a, b) => a + b.total, 0);
    });
    return total;
  }
  const totalPrice = calculateTotalPrice();
  function handle_checkout() {
    // write the api to post the order to the server
    alert("Order has been placed");
    route.push(`/homepage/${encodeURIComponent(user_id)}/order_managment`);
  }
  return (
    <div className="checkout_page_container">
      <div className="address_checkout_page">
        <div className="header_address_checkout">
          <Image
            src="/location_checkout.png"
            alt="location icon"
            width={20}
            height={20}
          />
          <p>Dia chi nhan hang</p>
        </div>
        <div className="information_address_checkout">
          <p>
            {user_information.user_name} {user_information.user_phone}
          </p>
          <p>{user_information.user_address[0]}</p>
          <button>Thay doi</button>
        </div>
      </div>
      <div className="field_bar_checkout">
        <div>
          <p>San Pham</p>
        </div>
        <div>
          <p>Don gia</p>
          <p>So luong</p>
          <p>Thanh tien</p>
        </div>
      </div>
      {cart.shop.map((shop) => {
        return (
          <div className="shop_checkout">
            <div className="shop_checkout_header">
              <p className="checkout_shop_name">{shop.shop_name}</p>
            </div>
            {shop.product.map((product) => {
              return (
                <div className="product_checkout">
                  <div className="product_checkout_left_section">
                    <Image
                      src={product.product_img}
                      alt="product_img"
                      width={100}
                      height={100}
                    />
                    <div className="product_information_checkout">
                      <p>{product.product_name}</p>
                      <p>{product.type}</p>
                    </div>
                  </div>
                  <div className="product_checkout_right_section">
                    <div>
                      <p>{product.price} 円</p>
                    </div>
                    <div>
                      <p>{product.quantity}</p>
                    </div>
                    <div>
                      <p>{product.total} 円</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="checkout_information_shipping">
              <div>
                <p>Ghi chu</p>
                <textarea placeholder="lời nhắn cho người bán"></textarea>
              </div>
              <div>
                <p>Đơn vị vận chuyển</p>
                <p>{shop.delivery_company}</p>
              </div>
            </div>
            <div>
              <p>
                Tổng cộng: {shop.product.reduce((a, b) => a + b.total, 0)} 円
              </p>
            </div>
          </div>
        );
      })}
      <div className="checkout_final_step">
        <div>
          <p>Tong tien hang: </p> <p>{totalPrice} 円</p>
        </div>

        <button onClick={handle_checkout}>Dat hang</button>
      </div>
    </div>
  );
}
