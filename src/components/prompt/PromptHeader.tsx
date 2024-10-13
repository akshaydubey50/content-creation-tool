import React, { useState, useCallback, useEffect } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { PropmtResourceModel } from "@/models/airtable.model";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LikeButton from "../ui/likebutton";
import BookmarkButton from "../ui/bookmarkbutton";

interface PromptHeaderProps {
  promptData: PropmtResourceModel;
}

const PromptHeader: React.FC<PromptHeaderProps> = React.memo(
  ({ promptData }) => {
    const [isTextCopied, setIsTextCopied] = useState(false);
    const [isBookMarked, setIsBookMarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = useCallback(() => setIsLiked((prev) => !prev), []);
    const handleBookmark = useCallback(
      () => setIsBookMarked((prev) => !prev),
      []
    );

    const copyPrompt = useCallback(async () => {
      if (promptData.fields.Description) {
        await navigator.clipboard.writeText(promptData.fields.Description);
        setIsTextCopied(true);
        setTimeout(() => setIsTextCopied(false), 3000);
      }
    }, [promptData.fields.Description]);

    const likedPromptList = useSelector(
      (state: RootState) => state.likes.likedList
    );
    const bookmarkedPromptList = useSelector(
      (state: RootState) => state.bookmarks.bookmarkList
    );

    const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
    const [isAlreadyBookmarked, setIsAlreadyBookmarked] = useState(false);

    // New effect for Likes
    useEffect(() => {
      if (likedPromptList?.length > 0) {
        const toolLikedItem = likedPromptList.find(
          (item) => item?.itemType?.toLowerCase() === "prompt"
        );
        if (toolLikedItem?.itemIds != null) {
          // Check if the current id is in the itemIds array
          setIsAlreadyLiked(
            toolLikedItem.itemIds.some((item) => item.itemId === promptData?.id)
          );
        } else {
          setIsAlreadyLiked(false);
        }
      } else {
        setIsAlreadyLiked(false);
      }
    }, [promptData?.id, likedPromptList]);

    // New effect for bookmarks
    useEffect(() => {
      if (
        bookmarkedPromptList?.length > 0 ||
        bookmarkedPromptList?.length != null
      ) {
        const toolBookmarkedItem = bookmarkedPromptList.find(
          (item) => item?.itemType?.toLowerCase() === "prompt"
        );
        if (toolBookmarkedItem?.itemIds != null) {
          // Check if the current id is in the itemIds array
          setIsAlreadyBookmarked(
            toolBookmarkedItem.itemIds.includes(promptData?.id)
          );
        } else {
          setIsAlreadyBookmarked(false);
        }
      } else {
        setIsAlreadyBookmarked(false);
      }
    }, [promptData?.id, bookmarkedPromptList]);

    return (
      <CardHeader>
        {/* {promptData.fields?.Category?.map((category, categoryIndex) => (
          <Badge key={categoryIndex} variant="outline">
            {category}
          </Badge>
        ))} */}
        <div className="flex justify-between items-start">
          <CardTitle className="text-3xl font-bold">
            {promptData.fields.Name}
          </CardTitle>
          <div className="flex items-center gap-4">
            <LikeButton
              key={promptData?.id}
              initialLikedState={isAlreadyLiked}
              itemId={promptData?.id}
              itemName={promptData?.fields?.Name}
              itemType="prompt"
            />
            <BookmarkButton
              key={promptData?.id}
              isInitialBookmarked={isAlreadyBookmarked}
              Name={promptData?.fields?.Name}
              id={promptData?.id}
              itemType="prompt"
            />
            <Button
              onClick={copyPrompt}
              variant="outline"
              size="sm"
              className={`border-black ${isTextCopied ? "bg-DarkOrange text-white border-none" : ""}`}
            >
              {isTextCopied ? "Copied Prompt" : "Copy Prompt"}
            </Button>
          </div>
        </div>
      </CardHeader>
    );
  }
);

PromptHeader.displayName = "PromptHeader";

export default PromptHeader;
