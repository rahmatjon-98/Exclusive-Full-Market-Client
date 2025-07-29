import React, { useState } from "react";
import img4 from "../shared/assets/images/Five star.png";
import HeadSection from "../shared/ui/headSection";
import ButWhite from "../shared/ui/butWhite";
import { useTranslation } from "react-i18next";
import { useGetProductsQuery } from "../entities/allApi";
import { useAddToCartMutation } from "../entities/allApi";
import { Link } from "react-router-dom";
import { useAppState } from "./useContext/AppStateContext";
import { Eye, Heart, Trash } from "lucide-react";

const Wishlist = () => {
  const { updateWishlistCount, updateCartCount, wishlistCount, cartCount } =
    useAppState();

  const { t } = useTranslation();
  let { data, refetch } = useGetProductsQuery();
  const [addToCart] = useAddToCartMutation();
  const [message, setMessage] = useState("");

  async function handleAddToCart(id) {
    await addToCart(id);
    refetch();
    setMessage(t("Products.added"));
    setTimeout(() => setMessage(""), 2000);
    updateCartCount();
  }

  const [wishList, setWishList] = useState(() => {
    const stored = localStorage.getItem("wishList");
    return stored ? JSON.parse(stored) : [];
  });

  function delProdWish(id) {
    const updatedList = wishList.filter((e) => e.id !== id);
    setWishList(updatedList);
    localStorage.setItem("wishList", JSON.stringify(updatedList));
    updateWishlistCount();
  }

  function toggleWish(product) {
    const yesOrNo = wishList.some((item) => item.id === product.id);

    let updatedList;
    if (yesOrNo) {
      updatedList = wishList.filter((item) => item.id !== product.id);
    } else {
      updatedList = [...wishList, product];
    }

    setWishList(updatedList);
    localStorage.setItem("wishList", JSON.stringify(updatedList));
    updateWishlistCount();
  }

  let token = localStorage.getItem("access_token");

  async function addToCartAll() {
    for (const e of wishList) {
      await addToCart(e.id);
    }

    refetch();
    updateCartCount();
    token ? setMessage(t("Products.added")) : setMessage("no");
    setTimeout(() => setMessage(""), 2000);
  }
  return (
    <div className="pt-20 lg:py-10 px-[5%] lg:px-[10%]">
      {message && (
        <div className="fixed top-2 left-[30%] lg:left-[43%] bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow z-50">
          {message}
        </div>
      )}
      <div className="flex justify-between">
        <p>
          {t("Wishlist.1")} ({wishlistCount})
        </p>
        <ButWhite onClick={addToCartAll} name={t("Wishlist.2")} />
      </div>
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-5 py-10">
        {wishList.length === 0 ? (
          <div className="col-span-4 text-center text-gray-500 text-xl py-20">
            {t("Wishlist.emptyMessage")}
          </div>
        ) : (
          wishList.map((e) => (
            <div key={e.id} className="space-y-3 basis-auto shrink-0 grow-0 ">
              <div className="flex items-center justify-center bg-[#F5F5F5] rounded w-full relative group">
                <span className="bg-[#DB4444] text-white px-4 py-1 rounded absolute top-3 left-3">
                  {t("Wishlist.3")}
                </span>

                <button
                  onClick={() => delProdWish(e.id)}
                  className="bg-white rounded-full  p-1 absolute top-3 right-3"
                >
                  <Trash strokeWidth={1.5} />
                </button>

                <Link to={`/info/${e.id}`}>
                  <button className="bg-white rounded-full p-1 absolute top-14 right-3">
                    <Eye strokeWidth={1.5} />
                  </button>
                </Link>

                <img
                  src={`https://store-api.softclub.tj/images/${
                    e.image ? e.image : e.images[0].images
                  }`}
                  alt=""
                  className="w-full h-[250px] object-cover"
                />

                <button
                  onClick={() => handleAddToCart(e.id)}
                  className="text-white bg-black w-full  p-1 absolute bottom-0 hidden group-hover:block"
                >
                  {t("Wishlist.4")}
                </button>
              </div>

              <p className="text-base font-medium ">{e.productName}</p>
              <div className="flex items-center gap-2.5">
                <p className="text-base font-medium text-red-500 ">{e.price}</p>
                <p className="text-base font-medium text-gray-500 line-through">
                  $160
                </p>
              </div>

              <div className="flex items-center gap-2 text-base font-medium text-gray-500">
                <img src={img4} alt="" /> (88)
              </div>
            </div>
          ))
        )}
      </section>
      <section className="py-10">
        <div className="flex justify-between items-center">
          <HeadSection name={t("Wishlist.5")} />

          <Link to={"/products"}>
            <ButWhite name={t("Wishlist.6")} />
          </Link>
        </div>

        <article className="flex overHidden overflow-x-scroll gap-5 py-10">
          {data &&
            data.data.products.map((e) => {
              const isInWishList = wishList.some((item) => item.id === e.id);

              return (
                <div
                  key={e.id}
                  className="space-y-3 basis-auto shrink-0 grow-0 lg:w-[25%] w-full"
                >
                  <div className="flex items-center justify-center bg-[#F5F5F5] rounded lg:w-full h-[250px] relative group">
                    {e.hasDiscount && (
                      <span className="bg-[#DB4444] text-white px-4 py-1 rounded absolute top-3 left-3">
                        {e.discountPrice}
                      </span>
                    )}

                    <button
                      onClick={() => toggleWish(e)}
                      className="bg-white rounded-full p-1 absolute top-3 right-3"
                    >
                      <Heart
                        strokeWidth={1}
                        fill={!isInWishList ? "white" : "#ef4444"}
                        className={
                          !isInWishList ? "text-black" : "text-[#ef4444]"
                        }
                      />
                    </button>

                    <Link to={`/info/${e.id}`}>
                      <button className="bg-white rounded-full p-1 absolute top-14 right-3">
                        <Eye strokeWidth={1.5} />
                      </button>
                    </Link>

                    <img
                      src={`https://store-api.softclub.tj/images/${e.image}`}
                      alt=""
                      className="w-[100%] h-[250px] object-cover"
                    />

                    <button
                      onClick={() => handleAddToCart(e.id)}
                      className="text-white bg-black w-full p-1 absolute bottom-0 hidden group-hover:block"
                    >
                      {t("Products.38")}
                    </button>
                  </div>

                  <p className="text-base font-medium">{e.productName}</p>

                  <div className="flex items-center gap-2.5">
                    <p className="text-base font-medium text-[#DB4444]">
                      {e.price}
                    </p>
                    <p className="text-base font-medium text-gray-500 line-through">
                      $160
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-base font-medium text-gray-500">
                    <img src={img4} alt="" /> (88)
                  </div>
                </div>
              );
            })}
        </article>
      </section>
    </div>
  );
};

export default Wishlist;
