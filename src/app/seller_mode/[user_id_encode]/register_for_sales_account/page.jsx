"use client";
import { useState } from "react";
import AWS from "aws-sdk";

import "./register_seller.css";
import { useRouter } from "next/navigation";
import { Allerta } from "next/font/google";
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});
export default function page({ params }) {
  const { user_id_encode } = params;
  const cognitoidentityserviceprovider =
    new AWS.CognitoIdentityServiceProvider();

  const route = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [isCheck, setIsCheck] = useState(false);
  const [shopName, setShopName] = useState("");
  async function handleCreateShop() {
    if (!isCheck) {
      setErrMsg("Please accept the terms and conditions");
    } else if (shopName === "") {
      setErrMsg("Please enter your shop's name");
    } else {
      // handle with server create shop
      // navigate to shop page
      setErrMsg("");
      alert("Create shop success");
      const shopName_encode = encodeURIComponent(shopName.replace(/\s/g, ""));
      const res = await fetch("/api/seller/information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shopName: shopName,
          User_ID: user_id_encode,
          shippingCompanyList: [
            "Default Shipping Company 1",
            "Default Shipping Company 2",
          ],
        }),
      });
      if (res.ok) {
        const params = {
          UserPoolId: process.env.NEXT_PUBLIC_AWS_Userpool_ID, // replace with your User Pool ID
          Username: user_id_encode, // replace with the username of the user
          GroupName: "seller",
        };

        cognitoidentityserviceprovider.adminAddUserToGroup(
          params,
          function (err, data) {
            console.log(data); // successful response
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data); // successful response
          }
        );
      }
      route.push(`/seller_mode/${user_id_encode}/${user_id_encode}/dashboard`);
    }
  }
  return (
    <div className="regiester_as_seller_page_container">
      <div className="header_register_as_seller">
        <h3>TPM</h3>
      </div>
      {!isRegister && (
        <div className="body_register_as_seller">
          <div className="content_for_register_as_seller">
            <h2>Create your own</h2>
            <h1>Online Shop now</h1>
            <p>
              Embark on your journey as a seller and let your unique products
              shine on our platform
            </p>
          </div>
          <div className="btn_container_for_register_as_seller">
            <button>Back to homepage</button>
            <button onClick={() => setIsRegister(true)}>Next</button>
          </div>
        </div>
      )}
      {isRegister && (
        <div className="Register_as_seller_body">
          <div className="register_as_seller_form">
            <p className="header_register_as_seller">Your shop's name</p>
            <input
              type="text"
              placeholder="Enter your shop's name"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>
          <div className="register_as_seller_form_privacy">
            <input
              type="checkbox"
              checked={isCheck}
              onClick={() => setIsCheck(!isCheck)}
            />
            <div>
              I have read and accepted the {user_id_encode}
              <a href="#">Terms and Conditions</a>
            </div>
          </div>
          <p>{errMsg}</p>
          <button onClick={handleCreateShop}>CREATE SHOP</button>
        </div>
      )}
    </div>
  );
}
