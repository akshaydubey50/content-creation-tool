import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import { addLike, deleteLike, getLikeList } from "@/redux/slice/like/like.slice";
import { useDispatch, useSelector } from "react-redux";

export function useLikeHandler(
  id: string,
  name: string,
  isInitialLiked: boolean,
  itemType: "tools" | "prompts"
) {
  const [isLiked, setIsLiked] = useState(isInitialLiked);
  const [localTotalLikes, setLocalTotalLikes] = useState(0);
  const { toast } = useToast();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const likedList = useSelector((state: RootState) => state.likes.likedList);
  const getLikeListStatus = useSelector((state: RootState) => state.likes.getLikeListStatus);

  useEffect(() => {
    // Only dispatch getLikeList if the status is idle (not fetched yet)
    if (getLikeListStatus === "idle") {
      dispatch(getLikeList());
    }
    // If the user is not logged in, don't set any initial liked state
    if (!session?.user) {
      setIsLiked(false);
    } else {
      setIsLiked(isInitialLiked);
    }
  }, [isInitialLiked, dispatch, getLikeListStatus, session]);

  useEffect(() => {
    if (likedList && likedList.length > 0) {
      // Find the item within likedList only if it's properly loaded
      const likeCategory = likedList?.find((like) => like.itemType === itemType);
      if (likeCategory) {
        const item = likeCategory.items?.find((item) => item.itemId === id);
        if (item) {
          setLocalTotalLikes(item.totalLikes); // Update local total likes
        }
      }
    }
  }, [likedList, id, itemType]);

  const handleLike = useCallback(async () => {
    if (!session || !session?.user) {
      toast({
        title: "Please log in to like",
        variant: "destructive",
      });
      return;
    }

    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLocalTotalLikes((prev) => (newLikedState ? prev + 1 : prev - 1));

    try {
      if (newLikedState) {
        await dispatch(addLike({ itemId: id, itemType }));
        toast({
          title: `You liked ${name}`,
          variant: "success",
        });
      } else {
        await dispatch(deleteLike({ itemId: id, itemType }));
        toast({
          title: `You removed ${name} from likes`,
          variant: "destructive",
        });
      }
      await dispatch(getLikeList());
    } catch (error) {
      console.error("Error liking/unliking the item:", error);
      setIsLiked(isLiked);
      setLocalTotalLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  }, [session, toast, name, dispatch, id, itemType, isLiked]);

  return { isLiked, handleLike, totalLikes: localTotalLikes };
}
