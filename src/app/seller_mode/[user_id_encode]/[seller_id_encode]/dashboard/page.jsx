"use client";
import "./dashboard_seller.css";
import { useState } from "react";
import Dashboard_tag from "@/components/dashboard_tag/dashboard_tag";
import LineGraph from "@/components/graph_dashboard/graph_dashboard";
import BestSeller from "@/components/best_seller_dashboard/best_seller";
export default function page() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
  const [optionGraph, setOptionGraph] = useState("month");
  const [dataGraph, setDataGraph] = useState([
    { label: "Jan", sales: 100 },
    { label: "Feb", sales: 150 },
    { label: "Mar", sales: 200 },
    { label: "Apr", sales: 120 },
    { label: "May", sales: 180 },
    { label: "Jun", sales: 250 },
  ]);
  function handleOptionGraph({ option }) {
    setOptionGraph(option);
    /// set dataGraph
    if (option === "week") {
      setDataGraph([
        { label: "Week 1", sales: 100 },
        { label: "Week 2", sales: 150 },
        { label: "Week 3", sales: 200 },
        { label: "Week 4", sales: 120 },
      ]);
    } else if (option === "month") {
      setDataGraph([
        { label: "Jan", sales: 100 },
        { label: "Feb", sales: 150 },
        { label: "Mar", sales: 200 },
        { label: "Apr", sales: 120 },
        { label: "May", sales: 180 },
        { label: "Jun", sales: 250 },
      ]);
    } else if (option === "year") {
      setDataGraph([
        { label: "2018", sales: 100 },
        { label: "2019", sales: 150 },
        { label: "2020", sales: 200 },
        { label: "2021", sales: 120 },
        { label: "2022", sales: 180 },
        { label: "2023", sales: 250 },
      ]);
    }
  }
  const [bestSellerData, setBestSellerData] = useState([
    { productId: "product_id" },
    { productId: "product_id" },
    { productId: "product_id" },
    { productId: "product_id" },
  ]);
  return (
    <div className="dashboard_seller">
      <div className="dashboard_container">
        <div className="dashboard_header">
          <p>Dashboard</p>
          <p>{formattedDate}</p>
        </div>
        <div className="dasboard_tag_container">
          <Dashboard_tag
            name="Total Order"
            totalValue={126.5}
            rateOfChange={34.7}
            compareWithTime="Oct 2023"
            isUp={true}
          />
          <Dashboard_tag
            name="Processing Order"
            totalValue={126.5}
            rateOfChange={34.7}
            compareWithTime="Oct 2023"
            isUp={true}
          />
          <Dashboard_tag
            name="Completed Order"
            totalValue={126.5}
            rateOfChange={34.7}
            compareWithTime="Oct 2023"
            isUp={true}
          />
          <Dashboard_tag
            name="Return Order"
            totalValue={126.5}
            rateOfChange={34.7}
            compareWithTime="Oct 2023"
            isUp={false}
          />
        </div>
        <div className="middle_section_dashboard">
          <div className="line_graph_container_seller">
            <div className="header_graph_container_seller">
              <h3>Sale Graph</h3>
              <div>
                <button
                  className={optionGraph === "week" ? "btn_active" : "btn"}
                  onClick={() => handleOptionGraph({ option: "week" })}
                >
                  Weakly
                </button>
                <button
                  className={optionGraph === "month" ? "btn_active" : "btn"}
                  onClick={() => handleOptionGraph({ option: "month" })}
                >
                  Monthly
                </button>
                <button
                  className={optionGraph === "year" ? "btn_active" : "btn"}
                  onClick={() => handleOptionGraph({ option: "year" })}
                >
                  Yearly
                </button>
              </div>
            </div>
            <LineGraph salesData={dataGraph} />
          </div>
          <div className="best_seller_container_dashboard">
            <div className="best_seller_dashboard_header">
              <h3>Best seller</h3>
            </div>
            <div className="best_seller_content">
              {bestSellerData.map((item, index) => {
                return <BestSeller key={index} productId={item.productId} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
