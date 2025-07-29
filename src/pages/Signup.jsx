import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../shared/assets/images/Icon-Google.png";
import { useSignUpMutation } from "../entities/allApi";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  const [signUp] = useSignUpMutation();

  let [userName, setUserName] = useState("");
  let [userPhone, setUserPhone] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userPassword, setUserPassword] = useState("");
  let [userConfirmPassword, setUserConfirmPassword] = useState("");
  let navigate = useNavigate();
  async function register() {
    try {
      const newUser = {
        userName: userName,
        phoneNumber: userPhone,
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
      };

      await signUp(newUser).unwrap();
      navigate("/login");
      console.log(newUser);
    } catch (err) {
      console.error("Registration failed", err);
    }
  }

  return (
    <div className="py-20 lg:py-10">
      <section className="lg:w-1/4 w-4/5 mx-auto">
        <p className="text-[24px] lg:text-[36px] font-semibold">
          {t("Signup.1")}
        </p>
        <p className="text-[16px] text-black">{t("Signup.2")}</p>

        <div className="flex flex-col gap-2 py-5">
          <input
            required
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="text"
            placeholder={t("Signup.3")}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            required
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="text"
            placeholder={t("Signup.4")}
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
          <input
            required
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="email"
            placeholder={t("Signup.5")}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <input
            required
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="password"
            placeholder={t("Signup.6")}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
          <input
            required
            className="py-1 px-2 rounded border border-[#0000003B]"
            type="password"
            placeholder={t("Signup.7")}
            value={userConfirmPassword}
            onChange={(e) => setUserConfirmPassword(e.target.value)}
          />

          <button
            className="px-10 py-3 rounded bg-[#DB4444] text-white"
            onClick={register}
          >
            {t("Signup.8")}
          </button>

          <button className="px-10 py-3 border border-[#0000003B] rounded flex items-center gap-2 justify-center">
            <img src={img1} alt="" /> {t("Signup.9")}
          </button>

          <p className="text-center">
            {t("Signup.10")}
            <Link to="/login" className="text-[#DB4444] px-2">
              {t("Signup.11")}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Signup;
