import React, { useState } from "react";
import { useLoginMutation } from "../entities/allApi";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const [login] = useLoginMutation();
  const { t } = useTranslation();

  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  let navigate = useNavigate();

  async function handleLogin() {
    try {
      let { data } = await login({
        userName: userName,
        password: userPassword,
      }).unwrap();
      localStorage.setItem("access_token", data);

      navigate("/");
    } catch (error) {
      console.error(error);
      alert(t("Login.error"));
    }
  }

  return (
    <div className="py-20 lg:py-10">
      <section className="w-4/5 lg:w-1/4 mx-auto">
        <p className="text-2xl lg:text-[36px] font-semibold">
          {t("Login.title")}
        </p>
        <p className="text-[16px] text-black">{t("Login.subtitle")}</p>
        <div className="flex flex-col gap-2 py-5">
          <input
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="text"
            placeholder={t("Login.usernamePlaceholder")}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="password"
            placeholder={t("Login.passwordPlaceholder")}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />

          <button className="px-10 py-3 text-[#DB4444] rounded">
            {t("Login.forgotPassword")}
          </button>

          <button
            className="px-10 py-3 rounded bg-[#DB4444] text-white"
            onClick={handleLogin}
          >
            {t("Login.loginBtn")}
          </button>

          <button className="px-10 py-3 rounded">
            {t("Login.noAccount")}
            <Link to="/signUp" className="text-[#DB4444] px-2">
              {t("Login.signupLink")}
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
};

export default React.memo(Login);
