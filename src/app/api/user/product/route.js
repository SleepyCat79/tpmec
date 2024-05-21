import connectToDatabase from "@/config/db";
import { NextResponse } from "next/server";
const db = connectToDatabase();

/// Get product details
export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const user_id = searchParams.get("user_id");
  const product_id = searchParams.get("product_id");
  const sql1 = `SELECT * FROM PRODUCT WHERE Product_ID=${product_id}`;
  const sql2 = `SELECT * FROM PRODUCT_IMAGE WHERE Product_ID=${product_id}`;
  const sql3 = `SELECT * FROM PRODUCT_OPTION WHERE Product_ID=${product_id}`;
  const sql4 = `SELECT COUNT(User_ID) as Likes
                FROM PRODUCT_LIKED
                WHERE Product_ID = ${product_id};`;
  const sql5 = `SELECT EXISTS(
              SELECT 1 
              FROM PRODUCT_LIKED 
              WHERE Product_ID = ${product_id} AND User_ID = '${user_id}'
              ) as IsLiked;`;

  const sql7 = `SELECT * FROM PRODUCT_DETAIL_DESCRIPTION WHERE Product_ID=${product_id}`;

  return new Promise((resolve, reject) => {
    db.query(sql1, (err, result1) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        db.query(sql2, (err, result2) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            db.query(sql3, (err, result3) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                const seller_id = result1[0].Seller_ID;
                const sql6 = `SELECT * FROM USER WHERE User_ID='${seller_id}'`;
                db.query(sql6, (err, result4) => {
                  if (err) {
                    console.log(err);
                    reject(err);
                  } else {
                    db.query(sql4, (err, result5) => {
                      if (err) {
                        console.log(err);
                        reject(err);
                      } else {
                        db.query(sql5, (err, result6) => {
                          if (err) {
                            console.log(err);
                            reject(err);
                          } else {
                            db.query(sql7, (err, result7) => {
                              if (err) {
                                console.log(err);
                                reject(err);
                              } else {
                                const product = {
                                  ...result1[0],
                                  images: result2,
                                  options: result3,
                                  seller: result4[0],
                                  likes: result5[0].Likes,
                                  isLiked: result6[0].IsLiked,
                                  description: result7,
                                };
                                resolve(NextResponse.json(product));
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
}

// like product
export async function POST(req) {
  const data = await req.json();
  const { product_id, user_id } = data;
  const sql = `INSERT INTO PRODUCT_LIKED (Product_ID, User_ID) VALUES (${product_id}, "${user_id}")`;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(NextResponse.json({ message: "Product liked" }));
      }
    });
  });
}
