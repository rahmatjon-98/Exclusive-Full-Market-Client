import { Mail, Phone } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Contact = () => {
  const { t } = useTranslation();
  // svg
  return (
    <div>
      <div className="flex items-center gap-3 py-5 px-[10%]">
        <Link to={"/"}>
          <p>{t("Cart.1")}</p>
        </Link>
        <p>/</p>
        <p>{t("Contact.2")}</p>
      </div>
      <div className="px-[10%] pb-10 flex flex-col md:flex-row gap-6 p-6 min-h-screen">
        <div className="bg-white shadow-md p-6 rounded-md w-full md:w-1/3 space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="bg-[#DB4444] rounded-full p-3 text-white">
                <Phone color="white" />
              </div>
              <h2 className="font-semibold text-lg">{t("Contact.3")}</h2>
            </div>

            <div>
              <p className="text-sm mt-1">{t("Contact.4")}</p>
              <p className="text-sm mt-1">{t("Contact.5")}</p>
            </div>
          </div>
          <hr />

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-[#DB4444] rounded-full p-3 text-white">
                <Mail color="white" />
              </div>
              <h2 className="font-semibold text-lg">{t("Contact.6")}</h2>
            </div>

            <div>
              <p className="text-sm mt-1">{t("Contact.7")}</p>
              <p className="text-sm mt-1">{t("Contact.8")}</p>
              <p className="text-sm">{t("Contact.9")}</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-md p-6 rounded-md w-full md:w-2/3">
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder={t("Contact.10")}
                className="border w-full p-3 rounded-md"
              />
              <input
                type="email"
                placeholder={t("Contact.11")}
                className="border w-full p-3 rounded-md"
              />
              <input
                type="tel"
                placeholder={t("Contact.12")}
                className="border w-full p-3 rounded-md"
              />
            </div>
            <textarea
              rows="6"
              placeholder={t("Contact.13")}
              className="border w-full p-3 rounded-md"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-[#DB4444] text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
              >
                {t("Contact.14")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Contact);
