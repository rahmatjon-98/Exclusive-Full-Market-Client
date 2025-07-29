import { Eye, Heart } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useGetByIdProductQuery,
  useGetProductsQuery,
} from "../entities/allApi";
import HeadSection from "../shared/ui/headSection";
import img1 from "../shared/assets/images/Five star.png";
import img2 from "../shared/assets/images/2.jpeg";
import img4 from "../shared/assets/images/3.jpg";
import React, { useEffect, useState } from "react";
import {
  useAddToCartMutation,
  useDecMutation,
  useGetCartQuery,
  useIncMutation,
} from "../entities/allApi";

import { useAppState } from "./useContext/AppStateContext";

import { useNavigate } from "react-router-dom";

const Info = () => {
  let navigate = useNavigate();
  const { t } = useTranslation();
  const { updateWishlistCount, updateCartCount } = useAppState();

  const { id } = useParams();

  const { data } = useGetProductsQuery();
  const { data: data2, isLoading } = useGetByIdProductQuery(id);
  const { data: data3, refetch } = useGetCartQuery();
  const token = localStorage.getItem("access_token");

  // const cartPrId = data3?.data[0].productsInCart[0].id;
  // const cartPrQuantity = data3?.data[0].productsInCart[0].quantity;
  // console.log(data3?.data[0].productsInCart[0].id);
  // console.log(data3?.data[0].productsInCart[0].quantity);

  const [cartPrId, setcartPrId] = useState(null);
  const [cartPrQuantity, setcartPrQuantity] = useState(null);

  useEffect(() => {
    if (data3 && data2) {
      const foundProduct = data3.data[0].productsInCart.find(
        (item) => item.product.id === data2.data.id
      );

      if (foundProduct) {
        setcartPrId(foundProduct.id);
        setcartPrQuantity(foundProduct.quantity);
      } else {
        setcartPrId(data2.data.id);
        setcartPrQuantity(0);
      }
    } else {
      setcartPrId(data2?.data.id);
      setcartPrQuantity(0);
    }
  }, [data3, data2]);

  const handlePlusClick = async () => {
    if (!token) {
      alert(t("alert.1"));
    } else if (cartPrQuantity === 0) {
      await addToCart(data2.data.id);
    } else {
      await incProduct(cartPrId);
    }
    updateCartCount();
  };

  const [addToCart] = useAddToCartMutation();

  let [inc] = useIncMutation();
  let [dec] = useDecMutation();

  const handleAddToCart = async (productId) => {
    if (!token) {
      alert(t("alert.1"));
    } else if (cartPrQuantity === 0) {
      await addToCart(productId);
      navigate("/cart");
    } else {
      navigate("/cart");
    }
    refetch();
    updateCartCount();
  };

  async function incProduct(id) {
    await inc(id);
    refetch();
  }

  async function decProduct(id) {
    await dec(id);
    refetch();
  }

  const [wishList, setWishList] = useState(() => {
    const stored = localStorage.getItem("wishList");
    return stored ? JSON.parse(stored) : [];
  });

  const toggleWish = (product) => {
    const exists = wishList.some((item) => item.id === product.id);
    let updatedList;
    if (exists) {
      updatedList = wishList.filter((item) => item.id !== product.id);
    } else {
      updatedList = [...wishList, product];
    }
    setWishList(updatedList);
    localStorage.setItem("wishList", JSON.stringify(updatedList));
    updateWishlistCount();
  };

  const isInWishList = wishList.some((item) => item.id === data2?.data?.id);

  if (isLoading || !data2?.data)
    return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="px-[5%] lg:px-[10%] py-10">
      <div className="flex flex-col justify-between lg:flex-row gap-10">
        <div className="w-[55%] flex gap-2.5 ">
          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4].map((e, i) => (
              <div key={i}>
                {data2.data.images.map((e) => (
                  <div
                    key={e.id}
                    className="w-25 h-25  rounded border border-[#F5F5F5] bg-[#F5F5F5]"
                  >
                    <img
                      src={`https://store-api.softclub.tj/images/${e.images}`}
                      alt={data2.data.productName}
                      className="w-full h-full object-cover rounded "
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {data2.data.images.map((e) => (
            <div
              key={e.id}
              className="w-8/10 rounded flex items-center justify-center border border-[#F5F5F5] bg-[#F5F5F5] "
            >
              <img
                src={`https://store-api.softclub.tj/images/${e.images}`}
                alt={data2.data.productName}
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="w-[45%] space-y-2">
          <h1 className="text-2xl font-semibold">{data2.data.productName}</h1>

          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <img src={img1} alt="" />
            (88)
            <p className="text-sm">{t("Info.2")}</p>
            <span className="text-black">| |</span>
            <p className="text-sm text-green-400">{t("Info.3")}</p>
          </div>

          <p className="text-2xl font-bold ">${data2.data.price}</p>
          <p className=" text-[#00000099] ">{data2.data.description}</p>

          <div className="flex items-center gap-4">
            <p className="text-sm">{t("Info.5")}</p>
            <div className="flex items-center gap-2">
              <button
                className={`w-6 h-6 rounded-full border ${data2.data.color}`}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm font-medium">{data2.data.brandName}</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-5">
            <div className="lg:order-0 order-2 flex items-center border rounded overflow-hidden w-fit">
              <button
                className="px-3 py-1 text-xl"
                onClick={() => decProduct(cartPrId)}
              >
                -
              </button>
              <span className="px-4">{cartPrQuantity}</span>
              <button
                className="px-3 py-1 text-xl bg-[#DB4444] text-white"
                onClick={() => handlePlusClick()}
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleAddToCart(data2.data.id)}
              className="bg-[#DB4444] text-white px-20 py-2 rounded lg:order-0 order-3"
            >
              {t("Info.7")}
            </button>

            <button
              onClick={() => toggleWish(data2.data)}
              className="bg-white rounded border border-[#00000080] p-1 "
            >
              <Heart
                strokeWidth={1}
                fill={!isInWishList ? "white" : "#ef4444"}
                className={!isInWishList ? "text-black" : "text-[#ef4444]"}
              />
            </button>
          </div>

          <div className="space-y-2">
            <div className="mt-4 border rounded p-4 flex items-center gap-2">
              <img src={"img1"} alt="" />
              <div>
                <p className="font-medium">{t("Info.8")}</p>
                <p className="text-sm text-gray-500">{t("Info.9")}</p>
              </div>
            </div>

            <div className="border rounded p-4 flex items-center gap-2">
              <img src={"img2"} alt="" />
              <div>
                <p className="font-medium">{t("Info.10")}</p>
                <p className="text-sm text-gray-500">
                  {t("Info.11")}{" "}
                  <a href="#" className="underline">
                    {t("Info.12")}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pt-10">
        <HeadSection name={t("Info.13")} />

        <div className="flex gap-5 overflow-x-scroll overHidden justify-between py-10">
          {data?.data?.products.map((e) => {
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
                  {/* {e.hasDiscount && (
                    <span className="bg-[#DB4444] text-white px-4 py-1 rounded absolute top-3 left-3">
                      {e.discountPrice}
                    </span>
                  )} */}
                </div>

                <div className="flex items-center gap-2 text-base font-medium text-gray-500">
                  <img src={img1} alt="" /> (88)
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default React.memo(Info);
