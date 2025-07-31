import { Eye, Heart, Search, StarIcon } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetBrandsQuery, useGetProductsQuery } from "../entities/allApi";
import img4 from "../shared/assets/images/Five star.png";
import { useAddToCartMutation } from "../entities/allApi";
import { useAppState } from "./useContext/AppStateContext";
import { Link } from "react-router";
import ProductFilter from "./ProductFilter";

const Products = () => {
  const { t } = useTranslation();
  const { updateWishlistCount, updateCartCount } = useAppState();

  let [filterMenu, setfilterMenu] = useState(false);

  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    subCategories: [],
    priceRange: [0, 10000],
  });

  const filterParams = useMemo(() => {
    const params = {};

    if (filters.brands.length > 0) {
      params.brandIds = filters.brands.join(",");
    }

    if (filters.categories.length > 0) {
      params.categoryId = filters.categories[0];
    }

    if (filters.subCategories.length > 0) {
      params.subCategoryIds = filters.subCategories.join(",");
    }

    if (filters.priceRange) {
      params.minPrice = filters.priceRange[0];
      params.maxPrice = filters.priceRange[1];
    }

    return params;
  }, [filters]);

  const onFilterChange = useCallback((filters) => {
    setFilters(filters);
  }, []);

  const { data } = useGetProductsQuery(filterParams);
  const [addToCart] = useAddToCartMutation();
  const [message, setMessage] = useState("");

  async function handleAddToCart(id) {
    await addToCart(id);
    setMessage(t("Products.added"));
    setTimeout(() => setMessage(""), 2000);
    updateCartCount();
  }

  const [wishList, setWishList] = useState(() => {
    const stored = localStorage.getItem("wishList");
    return stored ? JSON.parse(stored) : [];
  });

  function toggleWish(product) {
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
  }

  return (
    <div className="px-[5px] lg:px-[10%] py-10">
      {message && (
        <div className="fixed top-2 left-[30%] lg:left-[43%] bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded shadow z-50">
          {message}
        </div>
      )}

      <section className=" py-5 space-y-5 lg:flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <p>{t("Cart.1")}</p>
          </Link>
          <p>/</p>
          <p>{t("Products.2")}</p>
        </div>

        <div className="lg:hidden flex justify-between border p-2.5 rounded w-full">
          <input
            type="text"
            placeholder={t("Products.3")}
            className="outline-none w-9/10"
          />
          <button>
            <Search />
          </button>
        </div>

        <div className="flex justify-between">
          <select className="lg:w-auto w-[49%] text-black py-2 px-7 border border-[#0000003B] rounded text-center">
            <option value="">{t("Products.4")}</option>
          </select>

          <button
            onClick={() => setfilterMenu(!filterMenu)}
            className={`lg:hidden block w-[49%] py-2 px-7 border border-[#0000003B] rounded ${
              filterMenu ? "text-white bg-[#DB4444]" : "text-black bg-inherit"
            }`}
          >
            {t("Products.5")}
          </button>
        </div>
      </section>

      {filterMenu && <ProductFilter onFilterChange={onFilterChange} />}

      <section className="lg:flex gap-15  items-start">
        <div className="lg:block hidden">
          <ProductFilter onFilterChange={onFilterChange} />
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {data &&
            data.data.products.map((e) => {
              const isInWishList = wishList.some((item) => item.id === e.id);

              return (
                <div key={e.id} className="space-y-3  w-full">
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
                    {data && data.data.brands.brandName}
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

      <section className="flex justify-center py-14">
        {/* <ButRed name={t("Products.39")} /> */}
      </section>
    </div>
  );
};

export default React.memo(Products);
