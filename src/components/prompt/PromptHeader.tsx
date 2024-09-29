import React, { useState, useCallback } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { PropmtResourceModel } from "@/models/airtable.model";
import { Badge } from "../ui/badge";

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
            <button title="Like" type="button" onClick={handleLike}>
              {isLiked ? (
                <AiFillHeart className="text-2xl text-DarkOrange" />
              ) : (
                <AiOutlineHeart className="text-2xl text-black" />
              )}
            </button>
            <button title="Bookmark" type="button" onClick={handleBookmark}>
              {isBookMarked ? (
                <BsBookmarkFill className="text-2xl text-DarkOrange" />
              ) : (
                <BsBookmark className="text-2xl text-black" />
              )}
            </button>
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
