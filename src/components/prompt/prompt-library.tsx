"use client";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader/Loader";
import { fetchPromptResourceList } from "@/redux/slice/prompt-resource/promptResourceSlice";
import { PropmtResourceModel } from "@/models/airtable.model";
import PromptCategory from "./PromptCategory";
import PromptCard from "./PromptCard";
import Pagination from "../pagination/Pagination";

export default function PromptLibrary() {
  const [currentPage, setCurrentPage] = useState(1);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [promptList, setPromptList] = useState<PropmtResourceModel[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const { isLoading, isError, promptResourceList } = useSelector(
    (state: RootState) => state.promptResource
  );

  const itemsPerPage = 6;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPromptCategory = () => {
    const categoryList = new Set();
    if (promptList.length > 0) {
      promptList.map((prompt) => {
        if (!categoryList?.has(prompt.fields?.Category?.[0])) {
          categoryList.add(prompt.fields?.Category?.[0]);
        }
      });
    }

    return Array.from(categoryList);
  };


  const updateCurrentProducts = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newCurrentProducts = promptList!.slice(
      startIndex,
      endIndex
    );
    return newCurrentProducts;
  }, [currentPage, promptList]);

  useEffect(() => {
    updateCurrentProducts();
  }, [currentPage, promptList, updateCurrentProducts]);

  useEffect(() => {
    if (promptResourceList?.length === 0) {
      dispatch(fetchPromptResourceList());
    }
  }, [dispatch, promptResourceList]);

  useEffect(() => {
    console.log("useEffect Triggered!!!");
    if (!isLoading && promptResourceList.length > 0) {
      setPromptList(promptResourceList);
    }
  }, [isLoading, promptResourceList, isError, getPromptCategory]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
    <div className="flex flex-col  bg-background pt-10">
      {/* Mobile Category Toggle */}
      <div className="block lg:hidden p-4">
        <Button
          className="w-full flex justify-between items-center border-black bg-light-gray"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          Categories
          {isCategoryOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-6 gap-4 ">  
        {/* Left Sidebar - Categories */}
        <aside
          className={`col-span-1 lg:col-span-3 p-6 ${
            isCategoryOpen ? "block" : "hidden"
          } lg:block`}
        >
          <PromptCategory categoryList={getPromptCategory()} />
        </aside>

        {/* Main Content */}
        {/* {isLoading && <Loader />} */}
        {!isLoading && promptList.length > 0 && (
          <main className="col-span-1 lg:col-span-9 p-4 md:p-6">
            {/* <Input
              className="mb-6 ring-DarkOrange ring-opacity-50"
              placeholder="Looking for a prompt?"
            /> */}
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6"> 
                {updateCurrentProducts().map((prompt, index) => (
                <PromptCard key={index} promptResource={prompt} />
              ))}
            </div>
                <Pagination
                  currentPage={currentPage}
                  totalItems={promptList!.length}
                  onPageChange={handlePageChange}
                />
          </main>
        )}
      </div>
    </div>
    
      
    </>

  );
}
