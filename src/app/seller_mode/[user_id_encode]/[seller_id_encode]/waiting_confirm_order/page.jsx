"use client";
import "./page.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ({ params }) {
  const [orderWatingConfirm, setOrderWatingConfirm] = useState([]);
  const route = useRouter();

  const { user_id_encode, seller_id_encode } = params;

  useEffect(() => {
    fetch(`/api/seller/orders?seller_id=${seller_id_encode}`)
      .then((response) => response.json())
      .then((data) => {
        // Filter the data to only include orders with the status "Waiting confirmation"
        const waitingConfirmationOrders = data.filter(
          (order) => order.Status === "Waiting confirmation"
        );
        setOrderWatingConfirm(waitingConfirmationOrders);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, [seller_id_encode]);

  return (
    <div className="waiting_confirm_container">
      <div className="waiting_conform_order">
        <h3>Confirmation is awaited before proceeding with the order.</h3>
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Order ID</th>
              <th>Total Price</th>
              <th>User Name</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orderWatingConfirm.map((order, index) => (
              <tr key={index}>
                <td>{order.Total_quantity}</td>
                <td>{order.Order_ID}</td>
                <td>{order.Total_price}</td>
                <td>{order.Customer_ID}</td>
                <td>
                  {new Date(order.Order_date).toISOString().split("T")[0]}
                </td>
                <td>
                  <button
                    onClick={() => {
                      route.push(
                        `/homepage/${encodeURIComponent(
                          user_id_encode
                        )}/order_managment/${order.Order_ID}`
                      );
                    }}
                  >
                    View
                  </button>
                  <button>Accept</button>
                  <button>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
