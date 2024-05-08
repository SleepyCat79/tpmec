"use client";
import Image from "next/image";
import "./advertisement.css";
import { useRouter } from "next/navigation";
export default function AdvertisementCart({ advertisement, user_id }) {
  const router = useRouter();
  function showDetails() {
    router.push(
      `/homepage/${encodeURIComponent(user_id)}/${advertisement.product_id}`
    );
  }
  return (
    <div className="advertisement_cart_container">
      <Image src={advertisement.image} fill="true" alt="advertisement_image" />
      <div className="overlay">
        <button className="detail-button" onClick={showDetails}>
          Show Details
        </button>
      </div>
    </div>
  );
}
