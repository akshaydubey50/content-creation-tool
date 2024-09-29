import React, { useEffect } from "react";
import { useLikeHandler } from "@/hooks/useLikeHandler";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  itemId: string;
  itemName: string;
  initialLikedState: boolean;
  itemType: "tool" | "prompt";
}

const LikeButton = ({
  itemId,
  itemName,
  initialLikedState,
  itemType,
}: LikeButtonProps) => {
  const { isLiked, handleLike } = useLikeHandler(
    itemId,
    itemName,
    initialLikedState,
    itemType
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
      {/* <p>{isLiked ? totalLikes + 1 : totalLikes}</p> */}
    </button>
  );
};

export default LikeButton;
