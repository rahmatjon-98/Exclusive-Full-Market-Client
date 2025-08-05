import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserDataQuery,
} from "../entities/allApi";

const Account = () => {
  const [selectedImageName, setSelectedImageName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState(null); // File object
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  // const { data, isSuccess, refetch } = useGetUserDataQuery(id);
  const { data, isLoading, isError, error, refetch } = useGetUserDataQuery(id, {
    refetchOnReconnect: true,
    // pollingInterval: 2000,
  });
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (data?.data) {
      setFirstName(data.data.firstName || "");
      setLastName(data.data.lastName || "");
      setEmail(data.data.email || "");
      setPhoneNumber(data.data.phoneNumber || "");
      setDob(data.data.dob || "");
      setImage(null);
      setSelectedImageName("");
    }
  }, [data]);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setSelectedImageName(file.name);
    } else {
      setImage(null);
      setSelectedImageName("");
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("dob", dob);
    if (image) formData.append("image", image);
    try {
      await editUser(formData).unwrap();
      alert(t("account.updateSuccess"));
      refetch();
    } catch (error) {
      console.error(error);
      alert(t("account.updateError"));
    }
  }
  async function handleDelete(userId) {
    if (window.confirm(t("account.deleteConfirmation"))) {
      try {
        await deleteUser(userId).unwrap();
        alert(t("account.deleteSuccess"));
        navigate("/");
      } catch (error) {
        console.error(error);
        alert(t("account.deleteError"));
      }
    }
  }
  const token = localStorage.getItem("access_token");

  let [ImageFull, setImageFull] = useState(false);

  if (isLoading) {
    return <p className="py-10 text-center">{t("general.1")}</p>;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-5">
        <p className="text-red-500">{t("general.2")}</p>
        <button
          onClick={refetch}
          className="px-10 py-3 rounded bg-[#DB4444] text-white"
        >
          {t("general.3")}
        </button>
      </div>
    );
  }
  return (
    <div className="lg:pt-0 pt-10">
      <div className="flex items-center gap-3 pt-4 px-[10%]">
        <Link to="/">
          <p>{t("Cart.1")}</p>
        </Link>
        <p>/</p>
        <p>{t("account.myAccount")}</p>
      </div>

      <div className="flex lg:flex-row flex-col max-w-6xl mx-auto py-5 px-4 gap-10">
        <aside className="lg:w-1/4">
          <nav className="space-y-6">
            <div>
              <h3 className="text-black font-semibold mb-2">
                {t("account.sectionPersonalInfo")}
              </h3>
              <ul className="space-y-2 text-sm pl-5">
                <li className="text-[#DB4444] font-semibold">
                  {t("account.editProfile")}
                </li>
                <li className="text-gray-500">{t("account.changePassword")}</li>
                <li className="text-gray-500">{t("account.myOrders")}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-black font-semibold mb-2">
                {t("account.sectionSecurity")}
              </h3>
              <ul className="space-y-2 text-sm pl-5">
                <li className="text-gray-500">{t("account.twoFactor")}</li>
                <li className="text-gray-500">{t("account.devices")}</li>
              </ul>
            </div>
            <div>
              <Link to="/wishList">
                <h3 className="text-black font-semibold mb-2">
                  {t("account.logout")}
                </h3>
              </Link>
            </div>
          </nav>
        </aside>
        <div className="flex-1 bg-white shadow p-5 rounded-md">
          <h2 className="text-xl font-semibold text-[#DB4444]">
            {t("account.editProfile")}
          </h2>
          {!token ? (
            <div className="text-center text-2xl font-medium py-20">
              <Link
                to="/signUp"
                className="hover:underline py-5 hover:text-blue-600"
              >
                {t("logOrReg.3")}
              </Link>
              <p className="px-3 text-sm py-2">{t("logOrReg.2")}</p>
              <Link
                to="/login"
                className="hover:underline py-5 hover:text-blue-600"
              >
                {t("logOrReg.1")}
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="text-center py-2.5">
                <p className="block text-xl font-bold mb-2.5">
                  {t("account.profilePhoto")}
                </p>

                {data?.data?.image ? (
                  <img
                    className="w-[150px] h-[150px] rounded-full border mx-auto object-cover"
                    src={`https://store-api.softclub.tj/images/${data.data.image}`}
                    alt="avatar"
                    onClick={() => setImageFull(!ImageFull)}
                  />
                ) : (
                  <div className="w-[150px] h-[150px] rounded-full border mx-auto flex items-center justify-center text-gray-400">
                    {t("account.noImage")}
                  </div>
                )}

                {ImageFull && (
                  <div
                    style={{ backdropFilter: "blur(6px)" }}
                    onClick={() => setImageFull(!ImageFull)}
                    className="fixed inset-0 flex items-center justify-center z-10"
                  >
                    <img
                      className="w-[50%] h-[90vh]  p-10  object-cover mt-20"
                      src={`https://store-api.softclub.tj/images/${data.data.image}`}
                      alt="avatar"
                    />
                  </div>
                )}
              </div>
              <div className="relative w-full">
                <label
                  htmlFor="imageUpload"
                  className="block w-full text-center border px-3 py-2 rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {selectedImageName || t("account.chooseFile")}
                </label>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <fieldset className="border border-[#0000003B] rounded">
                  <legend className="px-2 ml-2 text-[12px] text-[#00000099] mb-1">
                    {t("account.firstName")}
                  </legend>
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 rounded outline-none"
                    placeholder="Your firstName"
                  />
                </fieldset>
                <fieldset className="border border-[#0000003B] rounded">
                  <legend className="px-2 ml-2 text-[12px] text-[#00000099] mb-1">
                    {t("account.lastName")}
                  </legend>
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 rounded outline-none"
                    placeholder="Your lastName"
                  />
                </fieldset>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <fieldset className="border border-[#0000003B] rounded">
                  <legend className="px-2 ml-2 text-[12px] text-[#00000099] mb-1">
                    {t("account.email")}
                  </legend>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded outline-none"
                    placeholder="Your Email"
                  />
                </fieldset>
                <fieldset className="border border-[#0000003B] rounded">
                  <legend className="px-2 ml-2 text-[12px] text-[#00000099] mb-1">
                    {t("account.phoneNumber")}
                  </legend>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded outline-none"
                    placeholder="Your phoneNumber"
                  />
                </fieldset>
              </div>
              <fieldset className="border border-[#0000003B] rounded">
                <legend className="px-2 ml-2 text-[12px] text-[#00000099] mb-1">
                  {t("account.dob")}
                </legend>
                <input
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 rounded outline-none"
                />
              </fieldset>
              <div className="flex justify-between gap-4 pt-4">
                <button
                  type="button"
                  className="bg-red-700 text-white font-semibold px-6 py-2 rounded hover:bg-red-600 text-[13px]"
                  onClick={() => handleDelete(data.data.userId)}
                >
                  {t("account.deleteAccount")}
                </button>
                <button
                  type="submit"
                  className="bg-green-700 text-white font-medium px-6 py-2 rounded hover:bg-green-600 text-[13px]"
                >
                  {t("account.save")}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Account);
