import React, { useState } from "react";
import img1 from "../shared/assets/images/Bkash.png";
import img2 from "../shared/assets/images/Visa.png";
import img3 from "../shared/assets/images/Mastercard.png";
import img4 from "../shared/assets/images/Nagad.png";
import { useTranslation } from "react-i18next";
import { useClearCartMutation, useGetCartQuery } from "../entities/allApi";
import { Link } from "react-router";

const Checkout = () => {
  const { t } = useTranslation();
  const [paymentMethod, setPaymentMethod] = useState("bank");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  let { data, refetch } = useGetCartQuery();
  let [clearCart] = useClearCartMutation();

  let subtotal = 0;

  async function handleOrderSubmit() {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !address.trim() ||
      !region.trim() ||
      !postalCode.trim() ||
      !email.trim()
    ) {
      alert(t("Checkout.fillAllFields"));
      return;
    }

    await clearCart();
    refetch();
    setMessage(t("Checkout.orderAccepted"));
    setTimeout(() => setMessage(""), 3000);
  }

  return (
    <div>
      {message && (
        <div className="fixed top-2 left-[20%] lg:left-[43%] bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow z-50">
          {message}
        </div>
      )}

      <div className="px-[5px] lg:px-[10%] py-10 flex items-center gap-3 lg:text-base text-sm">
        <Link to={"/"}>
          <p>{t("Cart.1")}</p>
        </Link>
        <p>/</p>
        <Link to={'/cart'}>
          <p>{t("Checkout.2")}</p>
        </Link>
        <p>/</p>
        <p>{t("Checkout.3")}</p>
      </div>

      <h2 className="text-2xl font-bold px-[10%]">{t("Checkout.4")}</h2>

      <div className="max-w-4/5 mx-auto py-10 flex lg:flex-row flex-col items-start justify-between gap-12">
        <div className="shadow shadow-[#00000029] p-5 lg:w-2/5 space-y-4">
          <input
            type="text"
            placeholder={t("Checkout.5")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-[#0000003B] rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder={t("Checkout.6")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-[#0000003B] rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder={t("Checkout.7")}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-[#0000003B] rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder={t("Checkout.8")}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border border-[#0000003B] rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder={t("Checkout.9")}
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border border-[#0000003B] rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder={t("Checkout.10")}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full border border-[#0000003B] rounded px-4 py-2"
          />
          <input
            type="email"
            placeholder={t("Checkout.11")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-[#0000003B] rounded px-4 py-2"
          />
          <label className="flex items-center space-x-2 mt-2">
            <input type="checkbox" className="accent-[#DB4444]" />
            <span>{t("Checkout.12")}</span>
          </label>
        </div>

        <div className="space-y-6 lg:w-[40%]">
          <div className="space-y-4">
            {data?.data[0]?.productsInCart?.length === 0 && (
              <div className="text-center text-gray-500 py-5 text-lg">
                {t("Cart.empty")}
              </div>
            )}

            {data?.data[0]?.productsInCart?.map((e) => (
              <div key={e.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <img
                    src={`https://store-api.softclub.tj/images/${e.product.image}`}
                    alt={e.product.productName}
                    className="w-10 h-10 object-cover"
                  />
                  <span>{e.product.productName}</span>
                </div>
                <span>${(e.product.hasDiscount ? e.product.discountPrice : e.product.price) * e.quantity}</span>
                <p className="hidden">
                  {(subtotal += (e.product.hasDiscount ? e.product.discountPrice : e.product.price) * e.quantity)}
                </p>
              </div>
            ))}

            <div className=" pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{t("Checkout.15")}</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between border-b pb-3 border-black">
                <span>{t("Checkout.16")}</span>
                <span>{t("Checkout.17")}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>{t("Checkout.18")}</span>
                <span>${subtotal}</span>
              </div>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="accent-black"
                />
                <span>{t("Checkout.19")}</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-black"
                />
                <span>{t("Checkout.20")}</span>
              </label>
            </div>

            <div className="flex gap-5">
              <img src={img1} alt="Bkash" className="h-6 mt-2" />
              <img src={img2} alt="Visa" className="h-6 mt-2" />
              <img src={img3} alt="Mastercard" className="h-6 mt-2" />
              <img src={img4} alt="Nagad" className="h-6 mt-2" />
            </div>
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              placeholder={t("Checkout.21")}
              className="border px-4 py-2 rounded w-full"
            />
            <button className="border border-[#DB4444] text-[#DB4444] px-4 py-2 rounded">
              {t("Checkout.22")}
            </button>
          </div>

          <button
            onClick={handleOrderSubmit}
            className="w-full bg-[#DB4444] text-white py-3 rounded mt-4"
          >
            {t("Checkout.23")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Checkout);
