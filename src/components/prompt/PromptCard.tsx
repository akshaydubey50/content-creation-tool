import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { PropmtResourceModel } from "@/models/airtable.model";
import { Badge } from "../ui/badge";
import LikeButton from "../ui/likebutton";
import BookmarkButton from "../ui/bookmarkbutton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import VisitWebsite from "../visit-website/VisitWebsite";

interface ItemId {
  itemId: string;
  likeCount: number;
}
const PromptCard = ({
  promptResource,
}: {
  promptResource: PropmtResourceModel;
}) => {
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
        (item) => item?.itemType?.toLowerCase() === "prompts"
      );
      if (toolLikedItem?.itemIds != null) {
        // Check if the current id is in the itemIds array
        setIsAlreadyLiked(
          toolLikedItem.itemIds.some(
            (item) => item.itemId === promptResource?.id
          )
        );
      } else {
        setIsAlreadyLiked(false);
      }
    } else {
      setIsAlreadyLiked(false);
    }
  }, [promptResource?.id, likedPromptList]);

  // New effect for bookmarks
  useEffect(() => {
    if (
      bookmarkedPromptList?.length > 0 ||
      bookmarkedPromptList?.length != null
    ) {
      const toolBookmarkedItem = bookmarkedPromptList.find(
        (item) => item?.itemType?.toLowerCase() === "prompts"
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
  }, [promptResource?.id, bookmarkedPromptList]);

  if (!promptResource) {
    return null;
  }
  return (
    <Card className="flex flex-col border-black hover:border-DarkOrange bg-light-gray ">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2 mb-2">
            {promptResource.fields?.Category?.map((category, categoryIndex) => (
              <Badge
                key={categoryIndex}
                variant="outline"
                className="bg-white hover:border-DarkOrange"
              >
                {category}
              </Badge>
            ))}
          </div>
          <LikeButton
            key={promptResource?.id}
            initialLikedState={isAlreadyLiked}
            itemId={promptResource?.id}
            itemName={promptResource?.fields?.Name}
            itemType="prompts"
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
          <VisitWebsite
            btnText="View Prompt"
            url={`/prompts/${promptResource.fields?.Name}`}
            openInNewTab={false}
          />
          <BookmarkButton
            key={promptResource.id}
            isInitialBookmarked={isAlreadyBookmarked}
            Name={promptResource.fields?.Name}
            id={promptResource.id}
            itemType="prompts"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
