import React from "react";
import img1 from "../shared/assets/images/portrait-two-african-females-holding-shopping-bags-while-reacting-something-their-smartphone 1.png";

import img2 from "../shared/assets/images/Services (6).png";
import img3 from "../shared/assets/images/Services (3).png";
import img4 from "../shared/assets/images/Services (4).png";
import img5 from "../shared/assets/images/Services (5).png";

import img6 from "../shared/assets/images/Frame 874.png";
import img7 from "../shared/assets/images/Frame 875.png";
import img8 from "../shared/assets/images/Frame 876.png";

import img9 from "../shared/assets/images/Icon-Twitter (1).png";
import img10 from "../shared/assets/images/icon-instagram (1).png";
import img11 from "../shared/assets/images/Icon-Twitter (1).png";

import img12 from "../shared/assets/images/Services.png";
import img13 from "../shared/assets/images/Services (1).png";
import img14 from "../shared/assets/images/Services (2).png";

import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="bg-white text-black  px-[5%] lg:px-[10%]  py-5 space-y-12">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to={"/"}>
            <p>{t("Cart.1")}</p>
          </Link>
          <p className="">/</p>
          <p className="text-sm text-gray-500">{t("About.2")}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10">
          <div className="lg:w-1/2 space-y-4">
            <h1 className="text-6xl font-semibold">{t("About.3")}</h1>
            <p className="text-base text-gray-700">{t("About.4")}</p>
            <p className="text-base text-gray-700">{t("About.5")}</p>
          </div>

          <div className="lg:w-1/2">
            <img loading="lazy" src={img1} alt="" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-[#0000004D] text-center p-4 rounded-md space-y-2">
            <div className="text-2xl flex justify-center">
              <img loading="lazy" src={img2} alt="" />
            </div>
            <h2 className="text-3xl font-bold">10.5k</h2>
            <p className="text-base">{t("About.6")}</p>
          </div>
          <div className="border border-[#0000004D] text-center p-4 rounded-md bg-[#DB4444] text-white space-y-2">
            <div className="text-2xl flex justify-center">
              <img loading="lazy" src={img3} alt="" />
            </div>
            <h2 className="text-3xl font-bold">33k</h2>
            <p className="text-base">{t("About.7")}</p>
          </div>
          <div className="border border-[#0000004D] text-center p-4 rounded-md space-y-2">
            <div className="text-2xl flex justify-center">
              <img loading="lazy" src={img4} alt="" />
            </div>
            <h2 className="text-3xl font-bold">45.5k</h2>
            <p className="text-base">{t("About.8")}</p>
          </div>
          <div className="border border-[#0000004D] text-center p-4 rounded-md space-y-2">
            <div className="text-2xl flex justify-center">
              <img loading="lazy" src={img5} alt="" />
            </div>
            <h2 className="text-3xl font-bold">25k</h2>
            <p className="text-base">{t("About.9")}</p>
          </div>
        </div>

        <div className="lg:grid  lg:grid-cols-3 gap-6 flex lg:overflow-x-hidden  overflow-x-scroll ">
          {[
            { name: "Tom Cruise", img: img6 },
            { name: "Emma Watson", img: img7 },
            { name: "Will Smith", img: img8 },
          ].map((e, i) => (
            <div
              key={i}
              className=" space-y-2 w-full basis-auto shrink-0 grow-0 "
            >
              <img
                className="w-full  bg-gray-200 rounded-md"
                src={e.img}
                alt=""
              />
              <h3 className="font-semibold text-lg">{e.name}</h3>
              <p className="text-sm text-gray-500">
                {e.name === "Tom Cruise" && t("About.10")}
                {e.name === "Emma Watson" && t("About.11")}
                {e.name === "Will Smith" && t("About.12")}
              </p>
              <div className="flex items-center  gap-2 text-gray-500">
                <img loading="lazy" src={img9} alt="" />
                <img loading="lazy" src={img10} alt="" />
                <img loading="lazy" src={img11} alt="" />
              </div>
            </div>
          ))}
        </div>

        <section className=" space-y-5 lg:grid grid-cols-3 gap-10 py-10 ">
          <div className="flex flex-col items-center">
            <img loading="lazy" src={img12} alt="" />
            <p className="text-xl font-semibold py-2">{t("About.13")}</p>
            <p className="text-[14px] ">{t("About.14")}</p>
          </div>
          <div className="flex flex-col items-center">
            <img loading="lazy" src={img13} alt="" />
            <p className="text-xl font-semibold py-2">{t("About.15")}</p>
            <p className="text-[14px] ">{t("About.16")}</p>
          </div>
          <div className="flex flex-col items-center">
            <img loading="lazy" src={img14} alt="" />
            <p className="text-xl font-semibold py-2">{t("About.17")}</p>
            <p className="text-[14px] ">{t("About.18")}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(About);
