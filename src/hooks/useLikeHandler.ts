import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AppDispatch } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import { addLike, deleteLike } from "@/redux/slice/like/like.slice";
import { useDispatch } from "react-redux";

export function useLikeHandler(
  id: string,
  Name: string,
  isInitialLiked: boolean,
  itemType: "tool" | "prompt",
  upVoteCount?: number
) {
  const [isLiked, setIsLiked] = useState(isInitialLiked);
  const [totalLikes, setTotalLikes] = useState(upVoteCount);
  const { toast } = useToast();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsLiked(isInitialLiked);
  }, [isInitialLiked]);

  const handleLike = useCallback(async () => {
    if (!session || !session?.user) {
      toast({
        title: "Please log in to like",
        variant: "destructive",
      });
      return;
    }

    setIsLiked((prevState) => !prevState); // Flip the isLiked state
    const newLikedState = !isLiked; // Capture the new state

    try {
      if (newLikedState) {
        await dispatch(addLike({ itemId: id, itemType }));
        setTotalLikes((prevCount:any) => prevCount + 1);
        toast({
          title: `You liked ${Name}`,
          variant: "success",
        });
      } else {
        await dispatch(deleteLike({ itemId: id, itemType }));
        setTotalLikes((prevCount:any) => prevCount - 1);
        toast({
          title: `You removed ${Name} from likes`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error liking/unliking the item:", error);
      // Revert the state back if there's an error
      setIsLiked(isLiked);
    }
  }, [session, toast, Name, dispatch, id, itemType, isLiked,]);

  return { isLiked, handleLike, totalLikes, setTotalLikes };
}
