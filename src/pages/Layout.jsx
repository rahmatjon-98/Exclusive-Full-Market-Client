import React, { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router";

import { useAppState } from "./useContext/AppStateContext";

import logo from "../shared/assets/images/Group 1116606595.svg";

import img1 from "../shared/assets/images/Component 2.svg";
import img2 from "../shared/assets/images/Wishlist.svg";
import img3 from "../shared/assets/images/Cart1.svg";
import img4 from "../shared/assets/images/user.svg";

import img5 from "../shared/assets/images/Icon-Facebook.png";
import img6 from "../shared/assets/images/Icon-Twitter.png";
import img7 from "../shared/assets/images/icon-instagram.png";
import img8 from "../shared/assets/images/Icon-Linkedin.png";
import { useTranslation } from "react-i18next";

import gb from "../shared/assets/images/gb.svg";
import ru from "../shared/assets/images/ru.svg";
import tj from "../shared/assets/images/tj.svg";
import { useGetCartQuery } from "../entities/allApi";

import { useUserId } from "./useUserId";
import { LogOut, Menu, SendHorizontal, ShoppingBag, User, X } from "lucide-react";

const Layout = () => {
  const { wishlistCount, cartCount, updateWishlistCount, updateCartCount } =
    useAppState();

  let userId = useUserId();

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  function TranslateClick(lang) {
    i18n.changeLanguage(lang);
    btnBars();
  }

  let [bars, setBars] = useState(false);
  function btnBars() {
    setBars(!bars);
  }

  let [account, setAccount] = useState(false);
  function btnAccount() {
    setAccount(!account);
  }

  let [token] = useState(localStorage.getItem("access_token"));

  function wishlistOrLog() {
    navigate("/wishlist");
  }

  async function logOut() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("wishList");
    await updateCartCount();
    btnAccount();
    navigate("/login");
  }

  function myOrder() {
    btnAccount();
  }

  function myAccount() {
    if (token) navigate("/account");
    else navigate("/login");

    btnAccount();
  }

  let { data, refetch } = useGetCartQuery();

  // useEffect(() => {
  //   refetch();
  // }, []);

  const [wishList, setWishList] = useState(() => {
    const stored = localStorage.getItem("wishList");
    return stored ? JSON.parse(stored) : [];
  });

  return (
    <div className="">
      <header className="fixed z-50 w-full bg-white flex items-center justify-between px-[8%] py-2.5 shadow shadow-[#0000001A]">
        <img className="lg:block hidden" src={logo} alt="" />
        
        <div className="flex items-center gap-2 lg:hidden">
          <button onClick={btnBars}>
            <Menu strokeWidth={1.5} />
          </button>
          <p className="text-2xl font-bold">{t("Layout.1")}</p>
        </div>

        <div
          style={{ backdropFilter: "blur(6px)" }}
          className={`fixed inset-0 z-60 flex lg:hidden transition-opacity duration-300 
            ${bars ? "opacity-100 visible" : "opacity-0 invisible"} `}
        >
          <div
            className={` w-4/5 bg-white shadow rounded transform transition-transform duration-300 ${
              bars ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div
              className="flex justify-end
             p-5 w-full mb-5 shadow text-[#DB4444]"
            >
              <X
                className="cursor-pointer"
                onClick={btnBars}
                color="#ff0000"
                strokeWidth={1.5}
              />
            </div>

            <div className="p-5 flex flex-col gap-4">
              <p>{t("Home.1")}</p>
              <div className="flex items-center justify-between pb-4">
                <button
                  className="space-y-2"
                  onClick={() => TranslateClick("ru")}
                >
                  <img
                    className="w-14 h-9 object-cover border border-[#00000053]"
                    src={ru}
                    alt=""
                  />
                  <p>Ru</p>
                </button>
                <button
                  className="space-y-2"
                  onClick={() => TranslateClick("tj")}
                >
                  <img
                    className="w-14 h-9 object-cover border border-[#00000053]"
                    src={tj}
                    alt=""
                  />
                  <p>Tj</p>
                </button>
                <button
                  className="space-y-2"
                  onClick={() => TranslateClick("en")}
                >
                  <img
                    className="w-14 h-9 object-cover border border-[#00000053]"
                    src={gb}
                    alt=""
                  />
                  <p>En</p>
                </button>
              </div>

              <Link onClick={btnBars} to={"/"}>
                {t("Layout.2")}
              </Link>
              <Link onClick={btnBars} to={"contact"}>
                {t("Layout.3")}
              </Link>
              <Link onClick={btnBars} to={"about"}>
                {t("Layout.4")}
              </Link>
              <Link onClick={btnBars} to={"products"}>
                {t("Layout.5")}
              </Link>
              <Link
                onClick={btnBars}
                to={"signUp"}
                className={`${token ? "hidden" : "block"}`}
              >
                {t("Layout.6")}
              </Link>
            </div>
          </div>
        </div>

        <div className=" items-center gap-4  lg:flex hidden">
          <Link to={"/"}>{t("Layout.2")}</Link>
          <Link to={"contact"}>{t("Layout.3")}</Link>
          <Link to={"about"}>{t("Layout.4")}</Link>
          <Link to={"products"}>{t("Layout.5")}</Link>
          <Link to={"signup"}>{t("Layout.6")}</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2">
            <button
              className="flex items-center gap-3"
              onClick={() => TranslateClick("ru")}
            >
              <img
                className="w-5 h-3 object-cover border border-[#00000053]"
                src={ru}
                alt=""
              />
            </button>
            <button
              className="flex items-center gap-3"
              onClick={() => TranslateClick("tj")}
            >
              <img
                className="w-5 h-3 object-cover border border-[#00000053]"
                src={tj}
                alt=""
              />
            </button>
            <button
              className="flex items-center gap-3"
              onClick={() => TranslateClick("en")}
            >
              <img
                className="w-5 h-3 object-cover border border-[#00000053]"
                src={gb}
                alt=""
              />
            </button>
          </div>

          <div className="bg-[#F5F5F5] rounded py-1 px-3 lg:flex hidden items-center ">
            <input
              type="text"
              placeholder={t("Layout.7")}
              className="outline-none w-40 text-[12px]"
            />
            <button>
              <img src={img1} alt="" />
            </button>
          </div>

          <button onClick={wishlistOrLog} className=" relative">
            <div className="bg-[#DB4444] w-4 h-4 flex items-center justify-center absolute ml-4 -mt-1 text-[12px] text-white rounded-full">
              {wishlistCount}
            </div>
            <img src={img2} alt="" />
          </button>

          <Link to={"cart"}>
            <button className="relative">
              <div className="bg-[#DB4444] w-4 h-4 flex items-center justify-center absolute ml-4 -mt-1 text-[12px] text-white rounded-full">
                {cartCount}
              </div>
              <img src={img3} alt="" />
            </button>
          </Link>

          <button onClick={btnAccount}>
            <User
              className={`${
                account ? "bg-[#DB4444] rounded-full text-white" : "text-black"
              } p-1 `}
              strokeWidth={1.5}
              size={30}
            />
          </button>

          {account && (
            <div
              style={{ backdropFilter: "blur(6px)" }}
              className="absolute z-5 top-20 right-[10%] flex flex-col gap-5 p-5 rounded lg:w-1/6 text-white bg-[#000000B8]"
            >
              <Link to={`/account/${userId}`}>
                <button onClick={myAccount} className="flex items-center gap-5">
                  <User />
                  {t("Layout.8")}
                </button>
              </Link>

              <button onClick={myOrder} className="flex items-center gap-5">
                <ShoppingBag />
                {t("Layout.9")}
              </button>

              <button onClick={logOut} className="flex items-center gap-5">
                <LogOut />
                {t("Layout.10")}
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="pt-5 lg:pt-20">
        <Outlet />
      </main>

      <footer className="bg-black text-white  px-[10%]">
        <article className="flex lg:flex-row flex-col gap-10 py-10">
          <div className="space-y-3 lg:w-1/5">
            <p className="text-2xl font-bold">{t("Layout.1")}</p>
            <p className="text-xl font-medium">{t("Layout.11")}</p>
            <p className="text-base ">{t("Layout.12")}</p>
            <div className=" border border-[#FAFAFA] rounded p-1.5 flex lg:justify-center justify-between">
              <input
                type="text"
                placeholder={t("Layout.13")}
                className="placeholder:text-[#d4d4d4] outline-none placeholder:text-[12px]"
              />
              <SendHorizontal />
            </div>
          </div>

          <div className="space-y-3 lg:w-1/5">
            <p className="text-xl font-medium">{t("Layout.14")}</p>
            <p className="text-base ">{t("Layout.15")}</p>
            <p className="text-base ">{t("Layout.16")}</p>
            <p className="text-base ">{t("Layout.17")}</p>
          </div>

          <div className="flex gap-16 ">
            <div className="space-y-3 ">
              <p className="text-xl font-medium">{t("Layout.18")}</p>
              <p className="text-base ">{t("Layout.19")}</p>
              <p className="text-base ">{t("Layout.20")}</p>
              <p className="text-base ">{t("Layout.21")}</p>
              <p className="text-base ">{t("Layout.22")}</p>
            </div>

            <div className="space-y-3 ">
              <p className="text-xl font-medium">{t("Layout.23")}</p>
              <p className="text-base ">{t("Layout.24")}</p>
              <p className="text-base ">{t("Layout.25")}</p>
              <p className="text-base ">{t("Layout.26")}</p>
              <p className="text-base ">{t("Layout.27")}</p>
            </div>
          </div>

          <div className="space-y-3 lg:w-1/5">
            <p className="text-xl font-medium">{t("Layout.28")}</p>
            <div className="flex gap-3">
              <img src={img5} alt="" />
              <img src={img6} alt="" />
              <img src={img7} alt="" />
              <img src={img8} alt="" />
            </div>
          </div>
        </article>

        <p className="text-base text-gray-500 text-center pb-10">
          {t("Layout.29")}
        </p>
      </footer>
    </div>
  );
};

export default React.memo(Layout);
