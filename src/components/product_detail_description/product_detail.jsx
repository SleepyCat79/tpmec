"use client";
import "./product_detail.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Product_detail_description({ user_id, product_id }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [selectedOptionDelivery, setSelectedOptionDelivery] = useState("");
  const [index_option, setIndex_option] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Add this line
  const [option, setOption] = useState([]);
  const [seller, setSeller] = useState({});
  const [liked, setLiked] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [comments, setComment] = useState({
    date: "",
    content: "",
    image: "",
    name: "",
    avatar: "",
  });
  useEffect(() => {
    fetch(`/api/user/product?product_id=${product_id}&user_id=${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
        setOption(data.options);
        setSeller(data.seller);
        setIsLoading(false);
        if (data.isLiked === 1) {
          setLiked(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    fetch(`/api/user/comment?product_id=${product_id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setComment(
          data.map((item) => ({
            date: item.Comment_date,
            content: item.Comment,
            image: item.Comment_image,
            name: item.user.LName,
            avatar: "https://tpms3.s3.ap-southeast-2.amazonaws.com/9.jpg",
          }))
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [product_id]);
  async function handleLikeProduct() {
    fetch("/api/user/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id, user_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setLiked(true);
        setProduct((prevProduct) => ({
          ...prevProduct,
          likes: prevProduct.likes + 1,
        })); // Update likes
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function handleDetailClick(detail) {
    setSelectedTitle(detail.Title);
  }
  async function unlikedProduct() {
    fetch("/api/user/product", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id, user_id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        setLiked(false);
        setProduct((prevProduct) => ({
          ...prevProduct,
          likes: prevProduct.likes - 1,
        })); // Update likes
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    console.log(product);
    console.log(option);
    console.log(seller);
  }, [product]);
  if (isLoading) {
    // Add this block
    return <div>Loading...</div>;
  }
  async function handleAddToCart() {
    const data = {
      product_id: product_id,
      user_id: user_id,
      option_number: index_option,
      quantity: quantity,
    };
    console.log(data);

    const response = await fetch("/api/user/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result.message);
      router.push(`/homepage/${encodeURIComponent(user_id)}/cart`);
    } else {
      console.error("Error:", response.statusText);
    }
  }

  function visitShop() {
    router.push(
      `/homepage/${encodeURIComponent(user_id)}/shop/${encodeURIComponent(
        seller.User_ID
      )}`
    );
  }
  return (
    <div className="product_detail">
      <p className="product_detail_product_name">{product.Product_title}</p>
      <div className="product_detail_seller">
        <div className="product_detail_seller_img_contaienr">
          <Image src={seller.Shop_image} alt="seller_img" fill="true" />
        </div>
        <div className="product_detail_seller_in4">
          <div>
            <Image
              src="/location_icon.png"
              height={15}
              width={15}
              alt="location icon"
            />
            <p>{seller.Shop_address}</p>
          </div>
          <button className="btn_visit_shop" onClick={visitShop}>
            <p className="product_detail_seller_name">{seller.Shop_name}</p>
          </button>
        </div>
      </div>
      <div className="option_container_product_detail">
        {option.map((option, index) => {
          return (
            <div
              key={index}
              className={
                index_option === index
                  ? "product_detail_option_active"
                  : "product_detail_option"
              }
              onClick={() => setIndex_option(index)}
            >
              <p>{option.Option_name}</p>
              <p>{option.Option_price}円</p>
            </div>
          );
        })}
      </div>
      <div className="product_detail_selection_number_product">
        <p>製品の数</p>
        <div>
          <button
            onClick={() => {
              quantity > 1 && setQuantity(quantity - 1);
            }}
          >
            <Image src="/minus_icon.png" fill="true" alt="minus icon" />
          </button>
          <p>{quantity}</p>
          <button
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            <Image src="/add_icon.png" fill="true" alt="add icon" />
          </button>
        </div>
      </div>

      <div className="product_detail_btn">
        <p style={{ right: "40px", position: "relative", fontWeight: "bold" }}>
          Total like : {product.likes}
        </p>
        <button onClick={liked ? unlikedProduct : handleLikeProduct}>
          <Image
            src={liked ? "/heart_liked.png" : "/heart.png"}
            width={30}
            height={30}
          />
        </button>
        <button
          className="product_detail_add_to_cart"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
      <div className="product_detail_description">
        <p className="description_title_product_detail">商品説明</p>
        <div>
          <p>{product.Product_description}</p>
        </div>
      </div>
      <div className="product_detail_description">
        <table>
          <tbody>
            {product.description.map((detail, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => handleDetailClick(detail)}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      borderBottom: "1px solid grey",
                    }}
                  >
                    <td style={{ fontWeight: "bold", color: "grey" }}>
                      {detail.Title}
                    </td>
                    <td>
                      {selectedTitle !== detail.Title && (
                        <Image
                          src={"/arrow.png"}
                          width={24}
                          height={24}
                        ></Image>
                      )}
                    </td>
                  </div>
                </tr>
                {selectedTitle === detail.Title && (
                  <tr style={{ transition: "all 0.5s ease-in-out" }}>
                    <td style={{ marginLeft: "10px", fontSize: "12px" }}>
                      {detail.Content}
                    </td>
                  </tr>
                )}
                <div style={{ height: "20px" }} />
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="comments_container">
        <h2>みんなの投稿</h2>
        <h4>2505件</h4>
        {comments &&
          comments.map((comment, index) => (
            <div className="comments" key={index}>
              <div className="comment_content">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Image
                    style={{ borderRadius: "50%" }}
                    src={comment.avatar}
                    height={50}
                    width={50}
                    alt="avatar"
                  />
                  <div className="comment_user">
                    <p>{comment.name}</p>
                    <p>{comment.date}</p>
                  </div>
                </div>
                <p>{comment.content}</p>
                {comment.image && (
                  <div className="comment_img">
                    <Image
                      src={comment.image}
                      height={150}
                      width={150}
                      alt="comment"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
