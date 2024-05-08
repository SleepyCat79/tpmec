"use client";
import "./page.css";
import { useState, useEffect } from "react";
export default function ({ params }) {
  const [orderWatingConfirm, setOrderWatingConfirm] = useState([]);
  const array = [
    {
      orderNumber: "1",
      orderID: "1",
      totalPrice: "1000",
      userName: "user1",
      date: "2021-09-01",
    },
    {
      orderNumber: "2",
      orderID: "2",
      totalPrice: "2000",
      userName: "user2",
      date: "2021-09-02",
    },
    {
      orderNumber: "3",
      orderID: "3",
      totalPrice: "3000",
      userName: "user3",
      date: "2021-09-03",
    },
    {
      orderNumber: "4",
      orderID: "4",
      totalPrice: "4000",
      userName: "user4",
      date: "2021-09-04",
    },
    {
      orderNumber: "5",
      orderID: "5",
      totalPrice: "5000",
      userName: "user5",
      date: "2021-09-05",
    },
    {
      orderNumber: "6",
      orderID: "6",
      totalPrice: "6000",
      userName: "user6",
      date: "2021-09-06",
    },
    {
      orderNumber: "7",
      orderID: "7",
      totalPrice: "7000",
      userName: "user7",
      date: "2021-09-07",
    },
    {
      orderNumber: "8",
      orderID: "8",
      totalPrice: "8000",
      userName: "user8",
      date: "2021-09-08",
    },
    {
      orderNumber: "9",
      orderID: "9",
      totalPrice: "9000",
      userName: "user9",
      date: "2021-09-09",
    },
    {
      orderNumber: "10",
      orderID: "10",
      totalPrice: "10000",
      userName: "user10",
      date: "2021-09-10",
    },
  ];
  useEffect(() => {
    setOrderWatingConfirm(array);
  }, []);
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
                <td>{order.orderNumber}</td>
                <td>{order.orderID}</td>
                <td>{order.totalPrice}</td>
                <td>{order.userName}</td>
                <td>{order.date}</td>
                <td>
                  <button>View</button>
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
