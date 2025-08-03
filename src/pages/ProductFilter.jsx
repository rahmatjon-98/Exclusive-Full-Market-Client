import React, { useCallback, useState } from "react";

import { Slider } from "antd";
import { useTranslation } from "react-i18next";

import { useGetBrandsQuery } from "../entities/allApi";
import { useGetCategoryQuery } from "../entities/allApi";

const ProductFilter = ({ onFilterChange }) => {
  console.log("ProductFilter");
  const { data: categories } = useGetCategoryQuery();
  const { data: brands } = useGetBrandsQuery();
  const { t } = useTranslation();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handleCheckboxChange = (id, selectedList, setSelectedList) => {
    if (selectedList.includes(id)) {
      setSelectedList(selectedList.filter((item) => item !== id));
    } else {
      setSelectedList([...selectedList, id]);
    }
  };

  const handleApplyFilter = useCallback(() => {
    onFilterChange({
      // brands: selectedBrands,
      categories: selectedCategories,
      subCategories: selectedSubCategories,
      priceRange: priceRange,
    });
  }, [
    onFilterChange,
    // selectedBrands,
    selectedCategories,
    selectedSubCategories,
    priceRange,
  ]);

  return (
    <div className="space-y-6 p-4">
      <div className="space-y-3">
        {/* <h3 className="font-bold text-base">{t("Products.brand")}</h3> */}
        {/* <div className="space-y-1 flex lg:flex-col flex-row gap-5 flex-wrap">
          {brands?.data?.map((brand) => (
            <label key={brand.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="accent-[#DB4444]"
                checked={selectedBrands.includes(brand.id)}
                onChange={() =>
                  handleCheckboxChange(
                    brand.id,
                    selectedBrands,
                    setSelectedBrands
                  )
                }
              />
              <span>{brand.brandName}</span>
            </label>
          ))}
        </div> */}
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-base mb-5">{t("Products.category")}</h3>
        <div className="space-y-4 grid lg:grid-cols-1 grid-cols-2 lg:gap-1 gap-5 ">
          {categories?.data?.map((category) => (
            <div key={category.id}>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="accent-[#DB4444]"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() =>
                    handleCheckboxChange(
                      category.id,
                      selectedCategories,
                      setSelectedCategories
                    )
                  }
                />
                <span className="font-semibold">{category.categoryName}</span>
              </label>

              <p
                className={`pt-2.5 text-sm font-medium pl-5 lg:pl-10 ${
                  category.subCategories.length ? "block" : "hidden"
                }`}
              >
                {t("Products.65")}
              </p>

              <div className="ml-10 mt-1 space-y-1">
                {category.subCategories?.map((sub) => (
                  <label
                    key={sub.id}
                    className="flex items-center space-x-2 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      className="accent-[#DB4444]"
                      checked={selectedSubCategories.includes(sub.id)}
                      onChange={() =>
                        handleCheckboxChange(
                          sub.id,
                          selectedSubCategories,
                          setSelectedSubCategories
                        )
                      }
                    />
                    <span>{sub.subCategoryName}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-base">{t("Products.priceRange")}</h3>
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onChange={setPriceRange}
        />

        <div className="flex justify-between gap-2">
          <input
            type="number"
            min={0}
            max={priceRange[1]}
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-[100px] px-4 py-1 border border-gray-300 rounded focus:outline-none"
          />
          <input
            type="number"
            min={priceRange[0]}
            max={10000}
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-[100px] px-4 py-1 border border-gray-300 rounded focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleApplyFilter}
          className="px-10 py-3 rounded bg-[#DB4444] text-white"
        >
          {t("Products.apply")}
        </button>
      </div>
    </div>
  );
};

export default React.memo(ProductFilter);
