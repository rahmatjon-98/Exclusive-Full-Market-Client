import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../entities/allApi";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login] = useLoginMutation();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await login({
        userName: data.userName,
        password: data.userPassword,
      }).unwrap();

      localStorage.setItem("access_token", response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(t("Login.error"));
    }
  };

  return (
    <div className="py-20 lg:py-10">
      <section className="w-4/5 lg:w-1/4 mx-auto">
        <p className="text-2xl lg:text-[36px] font-semibold">
          {t("Login.title")}
        </p>
        <p className="text-[16px] text-black">{t("Login.subtitle")}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 py-5">
          <input
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="text"
            placeholder={t("Login.usernamePlaceholder")}
            {...register("userName", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.userName && (
            <span className="text-red-500 text-sm">
              {t("Login.usernameError") || "Максимум 30 символов"}
            </span>
          )}

          <input
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="password"
            placeholder={t("Login.passwordPlaceholder")}
            {...register("userPassword", {
              required: true,
              minLength: 4,
            })}
          />
          {errors.userPassword && (
            <span className="text-red-500 text-sm">
              {t("Login.passwordError") || "Минимум 4 символа"}
            </span>
          )}

          <button
            type="button"
            className="px-10 py-3 text-[#DB4444] rounded"
          >
            {t("Login.forgotPassword")}
          </button>

          <button
            type="submit"
            className="px-10 py-3 rounded bg-[#DB4444] text-white"
          >
            {t("Login.loginBtn")}
          </button>

          <button type="button" className="px-10 py-3 rounded">
            {t("Login.noAccount")}
            <Link to="/signUp" className="text-[#DB4444] px-2">
              {t("Login.signupLink")}
            </Link>
          </button>
        </form>
      </section>
    </div>
  );
};

export default React.memo(Login);
