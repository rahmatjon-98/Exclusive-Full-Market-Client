import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useClearCartMutation,
  useDecMutation,
  useDeleteProductMutation,
  useGetCartQuery,
  useIncMutation,
} from "../entities/allApi";
import { RefreshCw, Trash, X } from "lucide-react";

const Cart = () => {
  const { t } = useTranslation();

  let { data, refetch } = useGetCartQuery();

  // useEffect(() => {
  //   refetch();
  // }, []);

  let [deleteProduct] = useDeleteProductMutation();
  let [clearCart] = useClearCartMutation();
  let [inc] = useIncMutation();
  let [dec] = useDecMutation();

  async function incProduct(id) {
    await inc(id);
    refetch();
  }

  async function decProduct(id) {
    await dec(id);
    refetch();
  }

  async function removeProduct(id) {
    await deleteProduct(id);
    refetch();
  }

  async function removeAll() {
    await clearCart();
    refetch();
  }

  let subtotal = 0;

  let token = localStorage.getItem("access_token");
  return (
    <div className="py-10">
      <div className="px-[5px] lg:px-[10%] py-10 flex items-center gap-3">
        <Link to={"/"}>
          <p>{t("Cart.1")}</p>
        </Link>
        <p>/</p>
        <p>{t("Cart.2")}</p>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="hidden lg:grid grid-cols-4 font-semibold text-gray-600 text-sm px-4">
          <div>{t("Cart.3")}</div>
          <div>{t("Cart.4")}</div>
          <div>{t("Cart.5")}</div>
          <div>{t("Cart.6")}</div>
        </div>

        <div className="space-y-4">
          {data?.data[0]?.productsInCart?.map((e) => (
            <div
              key={e.id}
              className="grid grid-cols-2 lg:grid-cols-4 space-x-10 items-center bg-white shadow rounded p-4 relative"
            >
              <div className="lg:order-0 order-1 lg:flex items-center space-x-4 space-y-4">
                <img
                  src={`https://store-api.softclub.tj/images/${e.product.image}`}
                  alt="LCD Monitor"
                  className="w-16 h-16 object-cover"
                />
                <Link to={`/info/${e.product.id}`}>
                  <span className="font-medium hover:text-blue-500 hover:underline">
                    {e.product.productName}
                  </span>
                </Link>
              </div>

              <div className="lg:order-0 order-3 ">${e.product.price}</div>

              <div className="lg:order-0 order-2 flex items-center border rounded overflow-hidden w-fit">
                <button
                  className="px-3 py-1 text-xl"
                  onClick={() => decProduct(e.id)}
                >
                  -
                </button>
                <span className="px-4">{e.quantity}</span>
                <button
                  className="px-3 py-1 text-xl bg-[#DB4444] text-white"
                  onClick={() => incProduct(e.id)}
                >
                  +
                </button>
              </div>

              <p className="hidden">
                {(subtotal += e.quantity * e.product.price)}
              </p>

              <div className="lg:order-0 order-4 flex justify-between">
                <div className="font-semibold">
                  ${e.quantity * e.product.price}
                </div>

                <button
                  onClick={() => removeProduct(e.id)}
                  className="bg-[#DB4444] rounded-full hover:bg-[#db444482]"
                >
                  <X color="#ffffff" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {!token && (
          <div className="text-center text-red-600 font-medium py-4">
            {t("Cart.authWarning")}
          </div>
        )}

        {data?.data[0]?.productsInCart?.length === 0 && (
          <div className="text-center text-gray-500 py-5 text-lg">
            {t("Cart.empty")}
          </div>
        )}

        <div className="flex justify-between flex-wrap gap-4">
          <Link to={"/products"}>
            <button className="border border-black px-4 py-2 rounded">
              {t("Cart.8")}
            </button>
          </Link>

          <div className=" hidden lg:flex gap-4">
            <button
              onClick={refetch}
              className="border border-black px-4 py-2 rounded"
            >
              {t("Cart.9")}
            </button>

            <button
              onClick={removeAll}
              className="border border-[#DB4444] text-[#DB4444] px-4 py-2 rounded"
            >
              {t("Cart.10")}
            </button>
          </div>

          <div className=" lg:hidden flex gap-4">
            <button className="border border-black px-4 py-2 rounded">
              <RefreshCw onClick={refetch} />
            </button>
            <button className="border border-[#DB4444] text-[#DB4444] px-4 py-2 rounded">
              <Trash onClick={removeAll} color="#DB4444" />
            </button>
          </div>
        </div>

        <div className="flex justify-between flex-wrap gap-8 mt-8">
          <div className="flex items-start lg:justify-start gap-5 justify-between lg:w-3/10 w-full">
            <input
              type="text"
              placeholder={t("Cart.11")}
              className="border px-4 py-2 rounded"
            />
            <button className="border border-[#DB4444] text-[#DB4444] px-4 py-2 rounded">
              {t("Cart.12")}
            </button>
          </div>

          <div className="border rounded p-4 w-full lg:w-80 space-y-4">
            <h4 className="font-semibold text-lg">{t("Cart.13")}</h4>
            <div className="flex justify-between text-sm">
              <span>{t("Cart.14")}</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>{t("Cart.15")}</span>
              <span>{t("Cart.16")}</span>
            </div>

            <div className="flex justify-between font-semibold">
              <span>{t("Cart.17")}</span>
              <span>${subtotal}</span>
            </div>

            <Link to={"/Checkout"}>
              <button className="w-full bg-[#DB4444] text-white py-2 rounded">
                {t("Cart.18")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Cart);
