"use client";
import { useState, useEffect } from "react";
import "./order_managment.css";
import { useRouter } from "next/navigation";
export default function Page({ params }) {
  const route = useRouter();
  const { user_id_encode } = params;
  const user_id = decodeURIComponent(user_id_encode);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`/api/user/orders?customer_id=${encodeURIComponent(user_id)}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="order_management_page_container">
      <h3>Order management</h3>
      <div className="order_management_in4">
        <div className="field_bar_order_management">
          <div>Created date</div>
          <div>Seller Name</div>
          <div>Total Price</div>
          <div>Quantity of items</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {orders.map((item, index) => (
          <div className="field_bar_order_management" key={index}>
            <div>{item.Order_date}</div>
            <div>{item.Seller_ID}</div>
            <div>{item.Total_price}</div>
            <div>{item.Total_quantity}</div>
            <div>{item.Status}</div>
            <div>
              <button
                onClick={() => {
                  route.push(
                    `/homepage/${encodeURIComponent(user_id)}/order_managment/${
                      item.Order_ID
                    }`
                  );
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
