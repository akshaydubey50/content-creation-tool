import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import { addLike, deleteLike } from "@/redux/slice/like/like.slice";
import { useDispatch, useSelector } from "react-redux";

export function useLikeHandler(
  id: string,
  Name: string,
  isInitialLiked: boolean,
  itemType: "tool" | "prompt"
) {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const handleLike = useCallback(() => {
    if (!session || !session?.user) {
      toast({
        title: "Please log in to like",
        variant: "destructive",
      });
      return;
    }

    setIsLiked((prevState) => !prevState);
    if (isLiked) {
      toast({
        title: `You liked ${Name}`,
        variant: "success",
      });
      dispatch(addLike({ itemId: id, itemType: itemType }));
    } else {
      toast({
        title: `You unliked ${Name}`,
        variant: "destructive",
      });
      console.log("itemId from useLikeHandler ==> ");
      dispatch(deleteLike({ itemId: id, itemType: itemType }));
    }
  }, [session, isLiked, toast, Name, dispatch, id, itemType]);

  return { isLiked, handleLike };
}
