import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { PropmtResourceModel } from "@/models/airtable.model";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import { Badge } from "../ui/badge";
import LikeButton from "../ui/likebutton";
import BookmarkButton from "../ui/bookmarkbutton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";

const PromptCard = ({
  promptResource,
}: {
  promptResource: PropmtResourceModel;
}) => {
  const router = useRouter();
  const likedPromptList = useSelector(
    (state: RootState) => state.likes.likedList
  );
  const bookmarkedPromptList = useSelector(
    (state: RootState) => state.bookmarks.bookmarkList
  );

  const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
  const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);

  useEffect(() => {
    if (likedPromptList.length > 0) {
      const toolLikedItem = likedPromptList.find(
        (item) => item.itemType === "prompt"
      );
      if (toolLikedItem?.itemIds != null) {
        // Check if the current id is in the itemIds array
        setIsAlreadyLiked(toolLikedItem.itemIds.includes(promptResource?.id));
      } else {
        setIsAlreadyLiked(false);
      }
    } else {
      setIsAlreadyLiked(false);
    }
  }, [likedPromptList, promptResource?.id]);

  // New effect for bookmarks
  useEffect(() => {
    if (bookmarkedPromptList.length > 0) {
      const toolBookmarkedItem = bookmarkedPromptList.find(
        (item) => item.itemType === "prompt"
      );
      if (toolBookmarkedItem?.itemIds != null) {
        // Check if the current id is in the itemIds array
        setIsAlreadyBookmarked(
          toolBookmarkedItem.itemIds.includes(promptResource?.id)
        );
      } else {
        setIsAlreadyBookmarked(false);
      }
    } else {
      setIsAlreadyBookmarked(false);
    }
  }, [bookmarkedPromptList, promptResource?.id]);

  const handlePromptClick = (promptResource: PropmtResourceModel) => {
    // navigate to prompt detail page
    const title = promptResource?.fields?.Name?.toLowerCase()
      .trim()
      .replace(/\s/g, "-");
    router.push(`/prompt/${title}`);
  };

  if (!promptResource) {
    return null;
  }
  return (
    <Card className="flex flex-col border-black hover:border-DarkOrange bg-light-gray ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2 mb-2">
            {promptResource.fields?.Category?.map((category, categoryIndex) => (
              <Badge key={categoryIndex} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
          {/* <button
            title="Bookmark"
            type="button"
            className="flex items-center gap-x-2"
            onClick={handleLike}
          >
            {isLiked ? (
              <AiFillHeart className="text-2xl text-DarkOrange" />
            ) : (
              <AiOutlineHeart className="text-2xl text-black" />
            )}
            <span>{Math.floor(Math.random() * 10) + 1}</span>
          </button> */}
          <LikeButton
            key={promptResource.id}
            initialLikedState={isAlreadyLiked}
            itemId={promptResource.id}
            itemName={promptResource.fields?.Name}
            itemType="prompt"
          />
        </div>
        <CardTitle className="text-lg">{promptResource.fields?.Name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow -mt-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {promptResource.fields?.Description?.split("\n")[0]}
        </p>
      </CardContent>
      <CardFooter className="">
        <div className="flex items-center justify-between gap-x-4">
          <Button
            onClick={() => handlePromptClick(promptResource)}
            className="px-4 py-2 font-semibold text-white border rounded-md  bg-DarkOrange hover:bg-DarkOrange/90 hover:bg-white hover:text-DarkOrange border-DarkOrange"
          >
            View Prompt
            <FiArrowUpRight className="text-2xl " />
          </Button>
          {/* <button title="Bookmark" onClick={handleBoomark}>
            {isBookMarked ? (
              <BsBookmarkFill className="text-2xl text-DarkOrange" />
            ) : (
              <BsBookmark className="text-2xl text-black" />
            )}
          </button> */}
          <BookmarkButton
            key={promptResource.id}
            isInitialBookmarked={isAlreadyBookmarked}
            Name={promptResource.fields?.Name}
            id={promptResource.id}
            itemType="prompt"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;