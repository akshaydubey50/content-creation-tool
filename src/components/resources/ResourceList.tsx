"use client";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchResourcesList } from "@/redux/slice/resources/ResourcesSlice";
import { ResourceTool } from "./ResourceTool";
import { getUpvoteList } from "@/redux/slice/upvote/upvoteSlice";
import Loader from "../common/Loader/Loader";
import { RootState, AppDispatch } from "@/redux/store";
import Pagination from "../pagination/Pagination";
import { useSession } from "next-auth/react";
import { ResourceModel } from "@/models/airtable.model";
import ResourceSidebar from "./ResourceSidebar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ResourceList() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch: AppDispatch = useDispatch();
  const { isUserAuthenticated } = useSelector((store: RootState) => store.user);
  const { data: session } = useSession();
  const { resourceList, isLoading } = useSelector(
    (state: RootState) => state.resources
  );

  const itemsPerPage = 12;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const updateCurrentProducts = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newCurrentProducts = resourceList?.slice(startIndex, endIndex);
    return newCurrentProducts;
  }, [currentPage, resourceList]);

  useEffect(() => {
    updateCurrentProducts();
  }, [currentPage, resourceList, updateCurrentProducts]);

  useEffect(() => {
    if (resourceList?.length === 0) {
      dispatch(fetchResourcesList());
    }
  }, [dispatch, resourceList]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 max-w-8xl mx-auto py-5 justify-items-center px-8  2xl:px-0">
        {resourceList?.length > 0 && (
          <>
            <div className="col-span-1  md:col-span-2 w-full ">
              <div className="block lg:hidden ">
                <Button
                  className="w-full flex justify-between items-center border-black bg-light-gray"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  Categories
                  {isCategoryOpen ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
                {isCategoryOpen && <ResourceSidebar />}
              </div>
              <div className="hidden lg:block">
                <ResourceSidebar />
              </div>
            </div>
            <div className="col-span-1 md:col-span-10 ">
              <main
                className="grid grid-cols-1 gap-y-6 md:grid-cols-2  md:gap-8 lg:grid-cols-3 
                  lg:gap-10  w-fit  mx-auto   justify-items-center "
              >
                {resourceList?.map((item: ResourceModel) => {
                  if (!item || !item.id) return null; // Add this line
                  return <ResourceTool key={item.id} record={item} />;
                })}
              </main>
              <Pagination
                currentPage={currentPage}
                totalItems={resourceList!.length}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
}
