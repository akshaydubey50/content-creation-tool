import React from "react";
import { useLikeHandler } from "@/hooks/useLikeHandler";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAuthState } from "@/hooks/useAuth";

interface LikeButtonProps {
  itemId: string;
  itemName: string;
  initialLikedState: boolean;
  itemType: "tools" | "prompts";
}

const LikeButton: React.FC<LikeButtonProps> = ({
  itemId,
  itemName,
  initialLikedState,
  itemType,
}) => {
  const {isAuthenticated} = useAuthState()

  const { isLiked, handleLike, totalLikes } = useLikeHandler(
    itemId,
    itemName,
    initialLikedState,
    itemType
  );

  // For unauthenticated users, always show outline heart
  // const showFilledHeart = isAuthenticated && isLiked;
  // console.log({isAuthenticated, isLiked})

  return (
    <button
      title={isAuthenticated ? "Like" : "Login to like"}
      type="button"
      onClick={handleLike}
      className="flex items-center gap-x-1 transition-all duration-200 hover:scale-110"
    >
      {isLiked ? (
        <AiFillHeart className="text-3xl text-DarkOrange" />
      ) : (
        <AiOutlineHeart className="text-3xl text-black" />
      )}
      <span className="font-medium">{totalLikes}</span>
    </button>
  );
};

export default LikeButton;