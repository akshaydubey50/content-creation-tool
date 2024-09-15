"use client";
import { useEffect, useState } from "react";
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

export default function PromptLibrary() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [promptList, setPromptList] = useState<PropmtResourceModel[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const { isLoading, isError, promptResourceList } = useSelector(
    (state: RootState) => state.promptResource
  );

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

  useEffect(() => {
    if (promptResourceList.length === 0) {
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
    <div className="flex flex-col min-h-screen bg-background pt-10">
      {/* Mobile Category Toggle */}
      <div className="md:hidden p-4">
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

      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Sidebar - Categories */}
        <aside
          className={`w-full md:w-64 p-6 ${
            isCategoryOpen ? "block" : "hidden"
          } md:block`}
        >
          <PromptCategory categoryList={getPromptCategory()} />
        </aside>

        {/* Main Content */}
        {/* {isLoading && <Loader />} */}
        {!isLoading && promptList.length > 0 && (
          <main className="flex-1 p-4 md:p-6">
            {/* <Input
              className="mb-6 ring-DarkOrange ring-opacity-50"
              placeholder="Looking for a prompt?"
            /> */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6">
              {promptList.map((prompt, index) => (
                <PromptCard key={index} promptResource={prompt} />
              ))}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
