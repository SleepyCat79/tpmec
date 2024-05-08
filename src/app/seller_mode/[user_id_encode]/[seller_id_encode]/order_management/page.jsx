"use client";
import "./order_management.css";
import { useState } from "react";
export default function () {
  const [order, setOrder] = useState([]);
  const array = [
    {
      orderNumber: "1",
      orderID: "1",
      totalPrice: "1000",
      userName: "user1",
      date: "2021-09-01",
      status: "Completed",
    },
    {
      orderNumber: "2",
      orderID: "2",
      totalPrice: "2000",
      userName: "user2",
      date: "2021-09-02",
      status: "Shipping",
    },
    {
      orderNumber: "3",
      orderID: "3",
      totalPrice: "3000",
      userName: "user3",
      date: "2021-09-03",
      status: "Packaging",
    },
    {
      orderNumber: "4",
      orderID: "4",
      totalPrice: "4000",
      userName: "user4",
      date: "2021-09-04",
      status: "Completed",
    },
    {
      orderNumber: "5",
      orderID: "5",
      totalPrice: "5000",
      userName: "user5",
      date: "2021-09-05",
      status: "Shipping",
    },
    {
      orderNumber: "6",
      orderID: "6",
      totalPrice: "6000",
      userName: "user6",
      date: "2021-09-06",
      date: "2021-09-03",
      status: "Packaging",
    },
    {
      orderNumber: "7",
      orderID: "7",
      totalPrice: "7000",
      userName: "user7",
      date: "2021-09-07",
      date: "2021-09-03",
      status: "Packaging",
    },
    {
      orderNumber: "8",
      orderID: "8",
      totalPrice: "8000",
      userName: "user8",
      date: "2021-09-08",
      status: "Shipping",
    },
    {
      orderNumber: "9",
      orderID: "9",
      totalPrice: "9000",
      userName: "user9",
      date: "2021-09-09",
      status: "Shipping",
    },
    {
      orderNumber: "10",
      orderID: "10",
      totalPrice: "10000",
      userName: "user10",
      date: "2021-09-10",
      status: "Shipping",
    },
  ];
  return (
    <div className="order_management_seller_container">
      <div className="order_management_seller">
        <h3>Order Management</h3>
        <div className="order_management_seller_filter_container">
          <div>
            <label>From</label>
            <input type="date" />
            <label>To</label>
            <input type="date" />
          </div>
          <div>
            <label>Type</label>
            <select>
              <option>All</option>
              <option>Completed</option>
              <option>Packaging</option>
              <option>Shipping</option>
            </select>
          </div>
          <div>
            <label>Order ID:</label>
            <input type="text" />
          </div>
          <button>Apply</button>
          <button>Reset</button>
        </div>
        <div className="table_order_seller">
          <table>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Order ID</th>
                <th>Status</th>
                <th>Total Price</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {array.map((item) => (
                <tr>
                  <td>{item.orderNumber}</td>
                  <td>{item.orderID}</td>
                  <td
                    style={{
                      color:
                        item.status === "Completed"
                          ? "green"
                          : item.status === "Packaging"
                          ? "orange"
                          : item.status === "Shipping"
                          ? "blue"
                          : "black",
                    }}
                  >
                    {item.status}
                  </td>
                  <td>{item.totalPrice}</td>
                  <td>{item.userName}</td>
                  <td>{item.date}</td>
                  <td>
                    <button>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
