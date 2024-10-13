import React from "react";
import { useLikeHandler } from "@/hooks/useLikeHandler";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface LikeButtonProps {
  itemId: string;
  itemName: string;
  initialLikedState: boolean;
  itemType: "tool" | "prompt";
}

const LikeButton: React.FC<LikeButtonProps> = ({
  itemId,
  itemName,
  initialLikedState,
  itemType,
}) => {
  const { isLiked, handleLike, totalLikes } = useLikeHandler(
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
      {isLiked ? (
        <AiFillHeart className="text-3xl text-DarkOrange" />
      ) : (
        <AiOutlineHeart className="text-3xl text-black" />
      )}
      <span>{totalLikes}</span>
    </button>
  );
};

export default LikeButton;