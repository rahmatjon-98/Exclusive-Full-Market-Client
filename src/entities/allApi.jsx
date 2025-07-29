import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://store-api.softclub.tj/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Auth
    signUp: builder.mutation({
      query: (userData) => ({
        url: "Account/register",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "Account/login",
        method: "POST",
        body: userData,
      }),
    }),

    // Cart
    getCart: builder.query({
      query: () => "Cart/get-products-from-cart",
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "Cart/clear-cart",
        method: "DELETE",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `Cart/delete-product-from-cart?id=${id}`,
        method: "DELETE",
      }),
    }),
    addToCart: builder.mutation({
      query: (id) => ({
        url: `Cart/add-product-to-cart?id=${id}`,
        method: "POST",
      }),
    }),
    inc: builder.mutation({
      query: (id) => ({
        url: `Cart/increase-product-in-cart?id=${id}`,
        method: "PUT",
      }),
    }),
    dec: builder.mutation({
      query: (id) => ({
        url: `Cart/reduce-product-in-cart?id=${id}`,
        method: "PUT",
      }),
    }),

    // Products
    getProducts: builder.query({
      query: (params) => ({
        url: "Product/get-products",
        params,
      }),
    }),

    getByIdProduct: builder.query({
      query: (id) => `Product/get-product-by-id?id=${id}`,
    }),

    // Category
    getCategory: builder.query({
      query: () => "Category/get-categories",
    }),
    //Brands
    getBrands: builder.query({
      query: () => "Brand/get-brands",
    }),
    getColors: builder.query({
      query: () => "Color/get-colors",
    }),
    getSubCategories: builder.query({
      query: () => "SubCategory/get-sub-category",
    }),

    // User
    getUserData: builder.query({
      query: (id) => `UserProfile/get-user-profile-by-id?id=${id}`,
    }),
    editUser: builder.mutation({
      query: (formData) => ({
        url: "UserProfile/update-user-profile",
        method: "PUT",
        body: formData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `UserProfile/delete-user?id=${id}`,
        method: "DELETE",
      }),
    }),

    // Admin/User List
    getDataUser: builder.query({
      query: () => "UserProfile/get-user-profiles",
    }),
  }),
});

export const {
  // Auth
  useSignUpMutation,
  useLoginMutation,

  // Cart
  useGetCartQuery,
  useClearCartMutation,
  useDeleteProductMutation,
  useAddToCartMutation,
  useIncMutation,
  useDecMutation,

  // Category
  useGetCategoryQuery,

  // Products
  useGetProductsQuery,
  useGetByIdProductQuery,
  useGetBrandsQuery,
  useGetColorsQuery,
  useGetSubCategoriesQuery,

  // User
  useGetUserDataQuery,
  useEditUserMutation,
  useDeleteUserMutation,

  // Admin
  useGetDataUserQuery,
} = allApi;
