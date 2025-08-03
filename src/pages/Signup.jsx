import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../shared/assets/images/Icon-Google.png";
import { useSignUpMutation } from "../entities/allApi";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const newUser = {
        userName: data.userName,
        phoneNumber: data.userPhone,
        email: data.userEmail,
        password: data.userPassword,
        confirmPassword: data.userConfirmPassword,
      };

      await signUp(newUser).unwrap();
      navigate("/login");
      console.log(newUser);
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <div className="py-20 lg:py-10">
      <section className="lg:w-1/4 w-4/5 mx-auto">
        <p className="text-[24px] lg:text-[36px] font-semibold">
          {t("Signup.1")}
        </p>
        <p className="text-[16px] text-black">{t("Signup.2")}</p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 py-5"
        >
          <input
            className="py-1 px-2 rounded border border-[#0000003B]"
            placeholder={t("Signup.3")}
            {...register("userName", { required: true })}
          />
          {errors.userName && (
            <span className="text-red-500 text-sm">
              {t("Signup.errors.name")}
            </span>
          )}

          <input
            className="py-1 px-2 rounded border border-[#0000003B]"
            placeholder={t("Signup.4")}
            {...register("userPhone", {
              required: true,
              pattern: /^[0-9]+$/,
            })}
          />
          {errors.userPhone && (
            <span className="text-red-500 text-sm">
              {t("Signup.errors.phone")}
            </span>
          )}

          <input
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="email"
            placeholder={t("Signup.5")}
            {...register("userEmail", {
              required: true,
              maxLength: 30,
            })}
          />
          {errors.userEmail && (
            <span className="text-red-500 text-sm">
              {t("Signup.errors.email")}
            </span>
          )}

          <input
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="password"
            placeholder={t("Signup.6")}
            {...register("userPassword", {
              required: true,
              minLength: 4,
            })}
          />
          {errors.userPassword && (
            <span className="text-red-500 text-sm">
              {t("Signup.errors.password")}
            </span>
          )}

          <input
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="password"
            placeholder={t("Signup.7")}
            {...register("userConfirmPassword", {
              required: true,
              validate: (value) => value === watch("userPassword"),
            })}
          />
          {errors.userConfirmPassword && (
            <span className="text-red-500 text-sm">
              {t("Signup.errors.confirmPassword")}
            </span>
          )}

          <button
            type="submit"
            className="px-10 py-3 rounded bg-[#DB4444] text-white"
          >
            {t("Signup.8")}
          </button>

          <button
            type="button"
            className="px-10 py-3 border border-[#0000003B] rounded flex items-center gap-2 justify-center"
          >
            <img loading="lazy" src={img1} alt="Google" /> {t("Signup.9")}
          </button>

          <p className="text-center">
            {t("Signup.10")}
            <Link to="/login" className="text-[#DB4444] px-2">
              {t("Signup.11")}
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Signup;
