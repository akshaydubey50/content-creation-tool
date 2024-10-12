import React, { useEffect } from "react";
import { useLikeHandler } from "@/hooks/useLikeHandler";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  itemId: string;
  itemName: string;
  initialLikedState: boolean;
  itemType: "tool" | "prompt";
  upVoteCount?: number;
}

const LikeButton = ({
  itemId,
  itemName,
  initialLikedState,
  itemType,
  upVoteCount

}: LikeButtonProps) => {
  const { isLiked, handleLike, totalLikes } = useLikeHandler(
    itemId,
    itemName,
    initialLikedState,
    itemType, upVoteCount
  );

  return (
    <button
      title="Likes"
      type="button"
      onClick={handleLike}
      className="flex items-center gap-x-1"
    >
      <p>
        {isLiked ? (
          <AiFillHeart className="text-3xl text-DarkOrange" />
        ) : (
          <AiOutlineHeart className="text-3xl text-black" />
        )}
      </p>
      <p>{totalLikes}</p>
    </button>
  );
};

export default LikeButton;
