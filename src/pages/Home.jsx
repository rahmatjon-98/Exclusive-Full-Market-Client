import React, { useEffect, useRef, useState } from "react";
import BtnRed from "../shared/ui/butRed";
import HeadSection from "../shared/ui/headSection";

import img1 from "../shared/assets/images/1200px-Apple_gray_logo 1.png";
import img2 from "../shared/assets/images/hero_endframe__cvklg0xk3w6e_large 2.png";

import img3 from "../shared/assets/images/Frame 611.png";
import img4 from "../shared/assets/images/Five star.png";

import img5 from "../shared/assets/images/672462_ZAH9D_5626_002_100_0000_Light-The-North-Face-x-Gucci-coat 1.png";
import img6 from "../shared/assets/images/Frame 694.png";

import img7 from "../shared/assets/images/71RdoeXxtrL 1.png";
import img8 from "../shared/assets/images/ps5-slim-goedkope-playstation_large 1.png";
import img9 from "../shared/assets/images/attractive-woman-wearing-hat-posing-black-background 1.png";
import img10 from "../shared/assets/images/Frame 707.png";
import img11 from "../shared/assets/images/Frame 706.png";

import img12 from "../shared/assets/images/Services.png";
import img13 from "../shared/assets/images/Services (1).png";
import img14 from "../shared/assets/images/Services (2).png";

import img15 from "../shared/assets/images/1.jpg";
import img16 from "../shared/assets/images/2.jpeg";
import img17 from "../shared/assets/images/3.jpg";
import img18 from "../shared/assets/images/4.jpg";
import img19 from "../shared/assets/images/5.jpg";

import { useTranslation } from "react-i18next";
import { useGetProductsQuery } from "../entities/allApi";
import { useGetCategoryQuery } from "../entities/allApi";
import { Link } from "react-router";
import { useAddToCartMutation, useGetCartQuery } from "../entities/allApi";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../app/style/app.css";

import { useAppState } from "../pages/useContext/AppStateContext";
import CountdownTimer from "../shared/ui/CountdownTimer";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ChevronRight,
  Divide,
  Eye,
  Heart,
  Search,
} from "lucide-react";

const Home = () => {
  const { t } = useTranslation();

  const scrollRef = useRef(null);
  console.log(scrollRef.current);

  function scrollRight() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  }
  function scrollLeft() {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  }

  const scrollRef2 = useRef(null);

  function scrollRight2() {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  }
  function scrollLeft2() {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  }

  const { data: data1, refetch } = useGetProductsQuery();
  const { data: data2 } = useGetCategoryQuery();
  const { updateWishlistCount, updateCartCount } = useAppState();

  // useEffect(() => {
  //   refetch();
  // }, []);

  const [addToCart] = useAddToCartMutation();
  const [message, setMessage] = useState("");

  async function handleAddToCart(id) {
    await addToCart(id);
    updateCartCount();
    refetch();
    setMessage(t("Products.added"));
    setTimeout(() => setMessage(""), 2000);
  }

  const [wishList, setWishList] = useState(() => {
    const stored = localStorage.getItem("wishList");
    return stored ? JSON.parse(stored) : [];
  });

  function toggleWish(product) {
    const isWish = wishList.some((item) => item.id === product.id);

    let updatedList;
    if (isWish) {
      updatedList = wishList.filter((item) => item.id !== product.id);
    } else {
      updatedList = [...wishList, product];
    }

    setWishList(updatedList);
    localStorage.setItem("wishList", JSON.stringify(updatedList));
    updateWishlistCount();
  }

  // console.log(data1?.data?.brands[0].brandName);
  const { data: categories } = useGetCategoryQuery();

  const [openSubCat, setOpenSubCat] = useState(null);

  return (
    <div id="first" className="pt-10 lg:pt-0">
      {message && (
        <div className="fixed top-2 left-[25%] lg:left-[43%] bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow z-50">
          {message}
        </div>
      )}

      <section className="sec1 px-[2%] lg:px-[10%] lg:py-10 lg:flex">
        <article className="p-5 lg:block flex flex-wrap gap-3 lg:border-r border-[#0000001A] lg:mr-10 lg:w-1/5 lg:space-y-2">
          <div className="lg:hidden flex justify-between border p-2.5 rounded w-full">
            <input
              type="text"
              placeholder={t("Section1.Search")}
              className="outline-none w-9/10"
            />
            <button>
              <Search />
            </button>
          </div>

          <div className="flex lg:flex-col flex-wrap lg:flex-nowrap gap-5 relative">
            {categories?.data?.map((e) => (
              <div key={e.id} className="flex flex-col">
                <button
                  onClick={() =>
                    setOpenSubCat((id) => (id === e.id ? null : e.id))
                  }
                  className="font-semibold text-left bg-[#F5F5F5] rounded py-1.5 px-2.5 lg:bg-inherit lg:p-0 flex justify-between"
                >
                  {e.categoryName}{" "}
                  <ChevronRight
                    className={`${openSubCat == e.id ? "rotate-90" : ""}`}
                  />
                </button>

                {openSubCat === e.id && e.subCategories.length > 0 && (
                  <div className="flex flex-col gap-1 pl-4 absolute bg-white mt-8 lg:pr-10 lg:mt-5 p-3 z-20 rounded">
                    {e.subCategories?.map((sub) => (
                      <button
                        key={sub.id}
                        className="text-sm text-left bg-[#F5F5F5] rounded py-1.5 px-2.5 cursor-pointer lg:bg-inherit lg:p-0"
                      >
                        {sub.subCategoryName}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <article className="text-white bg-black lg:flex items-center justify-between lg:p-5 w-full h-full  relative ">
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <div className="w-1/10">
                    <img src={img1} alt="" />
                  </div>
                  <p className="text-[18px]">{t("Section1.iPhone14")}</p>
                </div>
                <p className="text-2xl lg:text-5xl font-semibold py-2 lg:leading-16">
                  {t("Section1.UpTo10")}
                </p>

                <p className="flex items-center gap-3 hover:underline pt-5">
                  {t("Section1.ShopNow")}
                  <ArrowRight />
                </p>
              </div>
              <div className="lg:w-2/5">
                <img src={img2} alt="" />
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="text-white bg-black lg:flex items-center justify-between lg:p-5 w-full h-full  relative">
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <div className="w-1/10">
                    <img src={img1} alt="" />
                  </div>
                  <p className="text-[18px]">{t("Section1.SmartWatches")}</p>
                </div>
                <p className="text-2xl lg:text-5xl font-semibold py-2 lg:leading-16">
                  {t("Section1.UpTo20")}
                </p>

                <p className="flex items-center gap-3 hover:underline pt-5">
                  {t("Section1.ShopNow")}
                  <ArrowRight />
                </p>
              </div>

              <div className="lg:w-2/5">
                <img src={img15} alt="" />
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="text-white bg-black lg:flex items-center justify-between lg:p-5 w-full h-full relative">
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <div className="w-1/10">
                    <img src={img1} alt="" />
                  </div>
                  <p className="text-[18px]">{t("Section1.Laptops")}</p>
                </div>
                <p className="text-2xl lg:text-5xl font-semibold py-2 lg:leading-16">
                  {t("Section1.UpTo30")}
                </p>

                <p className="flex items-center gap-3 hover:underline pt-5">
                  {t("Section1.ShopNow")}
                  <ArrowRight />
                </p>
              </div>

              <div className="lg:w-2/5">
                <img src={img16} alt="" />
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="text-white bg-black lg:flex items-center justify-between lg:p-5 w-full h-full relative">
              <div className="p-10">
                <div className="flex items-center gap-3">
                  <div className="w-1/10">
                    <img src={img1} alt="" />
                  </div>
                  <p className="text-[18px]">{t("Section1.Earbuds")}</p>
                </div>
                <p className="text-2xl lg:text-5xl font-semibold py-2 lg:leading-16">
                  {t("Section1.UpTo15")}
                </p>

                <p className="flex items-center gap-3 hover:underline pt-5">
                  {t("Section1.ShopNow")}
                  <ArrowRight />
                </p>
              </div>

              <div className="lg:w-2/5">
                <img src={img17} alt="" />
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="text-white bg-black lg:flex items-center justify-between lg:p-5 w-full h-full relative">
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <div className="w-1/10">
                    <img src={img1} alt="" />
                  </div>
                  <p className="text-[18px]">{t("Section1.Accessories")}</p>
                </div>
                <p className="text-2xl lg:text-5xl font-semibold py-2 lg:leading-16">
                  {t("Section1.UpTo5")}
                </p>

                <p className="flex items-center gap-3 hover:underline pt-5">
                  {t("Section1.ShopNow")}
                  <ArrowRight />
                </p>
              </div>

              <div className="lg:w-2/5 ">
                <img className="w-[70%] mx-auto" src={img18} alt="" />
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="text-white bg-black lg:flex items-center justify-between lg:p-5 w-full h-full relative">
              <div className="p-8">
                <div className="flex items-center gap-3">
                  <div className="w-1/10">
                    <img src={img1} alt="" />
                  </div>
                  <p className="text-[18px]">{t("Section1.Tablets")}</p>
                </div>
                <p className="text-2xl lg:text-5xl font-semibold py-2 lg:leading-16">
                  {t("Section1.UpTo12")}
                </p>

                <p className="flex items-center gap-3 hover:underline pt-5">
                  {t("Section1.ShopNow")}
                  <ArrowRight />
                </p>
              </div>

              <div className="lg:w-2/5">
                <img src={img19} alt="" />
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="sec2 pl-[5%] lg:pl-[10%] py-10">
        <HeadSection name={t("Flash.1")} />

        <div className="flex items-center justify-between py-5">
          <div className="lg:flex items-center gap-20">
            <p className="text-4xl font-bold">{t("Flash.2")}</p>

            <CountdownTimer timeAll={345200} />
          </div>

          <div className="space-x-5 pr-[10%] lg:block hidden">
            <button
              onClick={scrollLeft}
              className="bg-[#F5F5F5] rounded-full p-2.5 "
            >
              <ArrowLeft />
            </button>
            <button
              onClick={scrollRight}
              className="bg-[#F5F5F5] rounded-full p-2.5 "
            >
              <ArrowRight />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          style={{ scrollBehavior: "smooth" }}
          className="flex lg:overflow-x-hidden overflow-x-scroll gap-5 py-10"
        >
          {data1 &&
            data1.data.products.map((e) => {
              const isInWishList = wishList.some((item) => item.id === e.id);

              return (
                <div
                  key={e.id}
                  className="space-y-3 lg:w-1/4 basis-auto shrink-0 grow-0 w-full"
                >
                  <div className="flex items-center justify-center bg-[#F5F5F5] rounded lg:w-full h-[250px] relative group">
                    {e.hasDiscount && (
                      <span className="bg-[#DB4444] text-white px-4 py-1 rounded absolute top-3 left-3">
                        -
                        {e.discountPrice > 0
                          ? Math.round(
                              ((e.price - e.discountPrice) / e.price) * 100
                            )
                          : 0}
                        %
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
                      className="text-white bg-black w-full p-1 absolute bottom-0 lg:hidden lg:group-hover:block"
                    >
                      {t("Products.38")}
                    </button>
                  </div>

                  <p className="text-2xl font-medium">{e.productName}</p>
                  <p className="font-bold ">
                    {data1 && data1.data.brands.brandName}
                  </p>

                  {!e.hasDiscount && (
                    <p className="text-2xl font-semibold text-[#DB4444]">
                      ${e.price}
                    </p>
                  )}
                  <div className="flex items-center gap-2.5"></div>

                  {e.hasDiscount && (
                    <div className="flex gap-5 items-end">
                      <span className="text-2xl font-semibold text-[#DB4444]">
                        ${e.discountPrice}
                      </span>

                      {e.hasDiscount && (
                        <p className="text-base font-semibold text-gray-500 line-through">
                          ${e.price}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-base font-medium text-gray-500">
                    <img src={img4} alt="" /> (88)
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex justify-center pr-[10%]">
          <Link to={"/products"}>
            <BtnRed name={t("Flash.8")} />
          </Link>
        </div>
      </section>
      <section className="sec3 px-[5%] lg:px-[10%] py-10">
        <HeadSection name={t("Categories.1")} />

        <div className="flex items-center justify-between">
          <p className="lg:text-4xl text-3xl font-bold py-3">
            {t("Categories.2")}
          </p>

          <div className="space-x-5  lg:block hidden">
            <button
              onClick={scrollLeft2}
              className="bg-[#F5F5F5] rounded-full p-2.5 "
            >
              <ArrowLeft />
            </button>
            <button
              onClick={scrollRight2}
              className="bg-[#F5F5F5] rounded-full p-2.5 "
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef2}
          className="flex overflow-x-scroll lg:overflow-x-hidden gap-7 py-10"
        >
          {data2 &&
            data2.data.map((e) => (
              <button
                key={e.id}
                className="border border-[#0000004D] p-5 rounded flex flex-col gap-2.5 items-center justify-center  lg:w-1/6 w-2/5 basis-auto grow-0 shrink-0 "
              >
                <img
                  className=" h-16"
                  src={`https://store-api.softclub.tj/images/${e.categoryImage}`}
                  alt=""
                />

                <p>{e.categoryName}</p>
              </button>
            ))}
        </div>
      </section>
      <section className="sec4 px-[5%] lg:px-[10%] py-10">
        <HeadSection name={t("BestSelling.1")} />
        <div className="lg:flex items-center justify-between">
          <p className="text-3xl lg:text-4xl font-bold py-3">
            {t("BestSelling.2")}
          </p>
          <Link to={"/products"}>
            <BtnRed name={t("BestSelling.3")} />
          </Link>
        </div>

        <div className="flex gap-5  overflow-x-scroll overHidden justify-between py-10">
          {data1 &&
            data1.data.products.map((e) => {
              const isInWishList = wishList.some((item) => item.id === e.id);

              return (
                <div
                  key={e.id}
                  className="space-y-3  basis-auto shrink-0 grow-0 lg:w-1/4 w-full"
                >
                  <div className="flex items-center justify-center bg-[#F5F5F5] rounded lg:w-full h-[250px] relative group">
                    {e.hasDiscount && (
                      <span className="bg-[#DB4444] text-white px-4 py-1 rounded absolute top-3 left-3">
                        -
                        {e.discountPrice > 0
                          ? Math.round(
                              ((e.price - e.discountPrice) / e.price) * 100
                            )
                          : 0}
                        %
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
                      className="text-white bg-black w-full p-1 absolute bottom-0 lg:hidden lg:group-hover:block"
                    >
                      {t("Products.38")}
                    </button>
                  </div>

                  <p className="text-2xl font-medium">{e.productName}</p>
                  <p className="font-bold ">
                    {data1 && data1.data.brands.brandName}
                  </p>

                  {!e.hasDiscount && (
                    <p className="text-2xl font-semibold text-[#DB4444]">
                      ${e.price}
                    </p>
                  )}
                  <div className="flex items-center gap-2.5"></div>

                  {e.hasDiscount && (
                    <div className="flex gap-5 items-end">
                      <span className="text-2xl font-semibold text-[#DB4444]">
                        ${e.discountPrice}
                      </span>

                      {e.hasDiscount && (
                        <p className="text-base font-semibold text-gray-500 line-through">
                          ${e.price}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-base font-medium text-gray-500">
                    <img src={img4} alt="" /> (88)
                  </div>
                </div>
              );
            })}
        </div>
      </section>
      <section className="sec5 mx-[5%] lg:mx-[10%] p-3 lg:p-10 bg-black lg:flex items-center justify-center">
        <div className="lg:w-[45%]">
          <p className="text-[#00FF66] text-[16px] font-semibold">
            {t("MusicSection.1")}
          </p>
          <p className="text-white text-3xl lg:text-[48px] font-semibold">
            {t("MusicSection.2")} <br /> {t("MusicSection.3")}
          </p>

          <CountdownTimer className={"text-white py-5"} timeAll={300000} />

          <button className="px-10 py-3 rounded bg-[#00FF66] text-black text-base font-medium">
            {t("MusicSection.8")}
          </button>
        </div>

        <img className="lg:w-2/4" src={img6} alt="" />
      </section>

      <section className="sec6 px-[5%] lg:px-[10%] py-10">
        <HeadSection name={t("OurProducts.1")} />
        <p className="text-3xl lg:text-4xl font-bold py-3">
          {t("OurProducts.2")}
        </p>

        <div className="flex  overflow-x-scroll lg:overflow-x-hidden  lg:space-y-5 lg:grid grid-cols-4 gap-5">
          {data1 &&
            data1.data.products.map((e) => {
              const isInWishList = wishList.some((item) => item.id === e.id);

              return (
                <div
                  key={e.id}
                  className="space-y-3  basis-auto shrink-0 grow-0  w-full"
                >
                  <div className="flex items-center justify-center bg-[#F5F5F5] rounded lg:w-full h-[250px] relative group">
                    {e.hasDiscount && (
                      <span className="bg-[#DB4444] text-white px-4 py-1 rounded absolute top-3 left-3">
                        -
                        {e.discountPrice > 0
                          ? Math.round(
                              ((e.price - e.discountPrice) / e.price) * 100
                            )
                          : 0}
                        %
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
                      className="text-white bg-black w-full p-1 absolute bottom-0 lg:hidden lg:group-hover:block"
                    >
                      {t("Products.38")}
                    </button>
                  </div>

                  <p className="text-2xl font-medium">{e.productName}</p>
                  <p className="font-bold ">
                    {data1 && data1.data.brands.brandName}
                  </p>

                  {!e.hasDiscount && (
                    <p className="text-2xl font-semibold text-[#DB4444]">
                      ${e.price}
                    </p>
                  )}
                  <div className="flex items-center gap-2.5"></div>

                  {e.hasDiscount && (
                    <div className="flex gap-5 items-end">
                      <span className="text-2xl font-semibold text-[#DB4444]">
                        ${e.discountPrice}
                      </span>

                      {e.hasDiscount && (
                        <p className="text-base font-semibold text-gray-500 line-through">
                          ${e.price}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-base font-medium text-gray-500">
                    <img src={img4} alt="" /> (88)
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex justify-center pt-14">
          <Link to={"/Products"}>
            <BtnRed name={t("OurProducts.4")} />
          </Link>
        </div>
      </section>
      <section className="sec7 px-[5%] lg:px-[10%] py-10">
        <HeadSection name={t("Featured.1")} />
        <p className="text-3xl lg:text-4xl font-bold py-3">{t("Featured.2")}</p>

        <div className="space-y-5 lg:grid grid-cols-2 gap-8 py-10">
          <div className="bg-black flex items-center justify-center pt-5 lg:pt-20 relative">
            <img src={img8} alt="" />

            <div className="text-white absolute w-2/5 space-y-2.5 bottom-10 left-10">
              <p className="text-2xl font-semibold">{t("Featured.3")}</p>
              <p className="text-[14px]">{t("Featured.4")}</p>
              <button className="text-[16px] font-medium underline ">
                {t("Featured.5")}
              </button>
            </div>
          </div>

          <div className="space-y-5 lg:grid  gap-8 ">
            <div className="bg-black flex items-center justify-center pt-5 relative">
              <img src={img9} alt="" />

              <div className="text-white absolute w-2/5 space-y-2.5 bottom-10 left-10">
                <p className="text-2xl font-semibold">{t("Featured.6")}</p>
                <p className="text-[14px]">{t("Featured.7")}</p>
                <button className="text-[16px] font-medium underline ">
                  {t("Featured.5")}
                </button>
              </div>
            </div>

            <div className="space-y-5 lg:grid grid-cols-2 gap-8 ">
              <div className="bg-black flex items-center justify-center pt-5 relative">
                <img src={img10} alt="" />

                <div className="text-white absolute w-4/5 space-y-2.5 bottom-10 left-10">
                  <p className="text-2xl font-semibold">{t("Featured.8")}</p>
                  <p className="text-[14px]">{t("Featured.9")}</p>
                  <button className="text-[16px] font-medium underline ">
                    {t("Featured.5")}
                  </button>
                </div>
              </div>

              <div className="bg-black flex items-center justify-center pt-5 h-[240px] relative">
                <img src={img11} alt="" />

                <div className="text-white absolute space-y-2.5 bottom-10 left-10">
                  <p className="text-2xl font-semibold">{t("Featured.10")}</p>
                  <p className="text-[14px]">{t("Featured.11")}</p>
                  <button className="text-[16px] font-medium underline ">
                    {t("Featured.5")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="sec8 px-[5%] lg:px-[10%] py-10 space-y-5 lg:grid grid-cols-3 text-center">
        <div className="flex flex-col items-center ">
          <img src={img12} alt="" />
          <p className="text-[18px] font-semibold py-2">{t("Delivery.1")}</p>
          <p className="text-[14px] ">{t("Delivery.2")}</p>
        </div>
        <div className="flex flex-col items-center ">
          <img src={img13} alt="" />
          <p className="text-[18px] font-semibold py-2">{t("Delivery.3")}</p>
          <p className="text-[14px] ">{t("Delivery.4")}</p>
        </div>
        <div className="flex flex-col items-center ">
          <img src={img14} alt="" />
          <p className="text-[18px] font-semibold py-2">{t("Delivery.5")}</p>
          <p className="text-[14px] ">{t("Delivery.6")}</p>
        </div>
      </section>
      <a
        href="#first"
        className="rounded-full bg-[#F5F5F5] p-2 fixed z-51 bottom-10 right-10 "
      >
        <ArrowUp />
      </a>
    </div>
  );
};

export default React.memo(Home);
