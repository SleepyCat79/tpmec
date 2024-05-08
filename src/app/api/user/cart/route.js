import connectToDatabase from "@/config/db";
import { NextResponse } from "next/server";
const db = connectToDatabase();

/// get list of product in cart of user
export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const user_id = searchParams.get("user_id");
  const sql = "call Get_Cart(?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [user_id], (err, result) => {
      if (err) {
        console.log(err);
        resolve(NextResponse.error(err));
      } else {
        const groupedResult = result[0].reduce((acc, item) => {
          if (!acc[item.Seller_ID]) {
            acc[item.Seller_ID] = [];
          }
          acc[item.Seller_ID].push(item);
          return acc;
        }, {});
        resolve(NextResponse.json(groupedResult));
      }
    });
  });
}
//add product to cart
export async function POST(req) {
  const data = await req.json();
  const { product_id, user_id, option_number, quantity } = data;
  const sql = `call Add_To_Cart(${product_id},'${user_id}',${option_number},${quantity})`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        resolve(NextResponse.error(err));
      } else {
        resolve(NextResponse.json({ message: "Added to cart" }));
      }
    });
  });
}

///delete product out of cart
export async function DELETE(req) {
  const data = await req.json();
  const { product_id, user_id, option_number } = data;
  const sql = `call Remove_From_Cart(${product_id},'${user_id}',${option_number})`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        resolve(NextResponse.error(err));
      } else {
        resolve(NextResponse.json({ message: "Removed -from cart" }));
      }
    });
  });
}

//update quantity of product in cart
export async function PUT(req) {
  const data = await req.json();
  const { product_id, user_id, option_number, quantity } = data;
  const sql = `call Update_Cart_Quantity(${product_id},'${user_id}',${option_number},${quantity})`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        resolve(NextResponse.error(err));
      } else {
        resolve(NextResponse.json({ message: "Updated quantity" }));
      }
    });
  });
}
// Path: src/app/api/user/cart/route.js
