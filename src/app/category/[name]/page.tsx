"use client";
import AirtableModel from "@/models/airtableModel";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * React Component Import
 * */
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import ProductList from "@/components/card/ProductList";

/**
 * NextJs Route Hook Import
 * */
import { usePathname, useParams } from "next/navigation";

/**
 * Context Data Import
 * */
import { useVisibleItemContextData } from "@/lib/visibleItemContext";

/**
 * Redux Import
 * */
import { setCategoryData, setMatchedCategory } from "@/lib/slice/categorySlice";
import { clearSearchFilterList } from "@/lib/slice/searchSlice";
import { RootState, AppDispatch } from "@/lib/store";

export default function ToolDetails() {
  const dispatch: AppDispatch = useDispatch();
  const categoryData = useSelector(
    (store: RootState) => store.category.categoryData
  );
  const productList: AirtableModel[] | null = useSelector(
    (store: RootState) => store.product.productList
  );

  const { setVisibleItem } = useVisibleItemContextData();
  const pathName = usePathname();
  const param = useParams();

  const categoryTypeHandler = useCallback(() => {
    const urlData = pathName.split("/").filter((item) => item !== "");
    if (urlData.length > 0) {
      const getCurrentCategory = urlData[urlData.length - 1];
      // Filter data directly based on the current category in the URL
      const filteredData = productList!.filter(
        (item: AirtableModel) =>
          item.fields.Tags[0]?.toLowerCase().replace(/\s/g, "-") ===
          getCurrentCategory)
      
      dispatch(setMatchedCategory(filteredData));
    }

    // url params value set to category dropdown
    const paramData: AirtableModel | undefined = productList!.find(
      (item: AirtableModel) => {
        let urlParamCategoryName = param.name;
        if (param.name && param.name.includes("%26")) {
          urlParamCategoryName = param.name.replace(/%26/g, "&");
        }
        let contexApiData = item.fields?.Tags[0]
          ?.toLowerCase()
          .replace(/\s/g, "-");
        return contexApiData === urlParamCategoryName;
      }
    );
    // from paramData we can get the current category base on url param
    if (paramData) {
      const getParamBaseCategory = paramData['fields']['Tags'][0];
      dispatch(clearSearchFilterList());
      dispatch(setCategoryData(getParamBaseCategory));
    }
  }, [pathName, productList, param.name, dispatch]);

  useEffect(() => {
    setVisibleItem(9);
    categoryTypeHandler();
  }, [setVisibleItem, categoryTypeHandler]);

  return (
    <>
      <HeroSection />
      <FilterSection />
      <ProductList />
    </>
  );
}
