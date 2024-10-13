import { useState, useCallback, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/redux/store";
import { useToast } from "@/components/ui/use-toast";
import {
  addLike,
  deleteLike,
  getLikeList,
} from "@/redux/slice/like/like.slice";
import { useDispatch, useSelector } from "react-redux";

export function useLikeHandler(
  id: string,
  Name: string,
  isInitialLiked: boolean,
  itemType: "tool" | "prompt"
) {
  const [isLiked, setIsLiked] = useState(isInitialLiked);
  const [totalLikes, setTotalLikes] = useState(0);
  const { toast } = useToast();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const likedList = useSelector((state: RootState) => state.likes.likedList);

  useEffect(() => {
    setIsLiked(isInitialLiked);
  }, [isInitialLiked]);

  useEffect(() => {
    // Find the correct item in the likedList and update totalLikes
    const item = likedList
      ?.find((like) => like.itemType === itemType)
      ?.itemIds.find((item) => item.itemId === id);

    if (item) {
      console.log(`Updating total likes for ${id}: ${item.likeCount}`);
      setTotalLikes(item.likeCount);
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
    console.log(
      `Changing like state for ${id} from ${isLiked} to ${newLikedState}`
    );
    setIsLiked(newLikedState);

    try {
      if (newLikedState) {
        console.log(`Adding like for ${id}`);
        await dispatch(addLike({ itemId: id, itemType }));
        toast({
          title: `You liked ${Name}`,
          variant: "success",
        });
      } else {
        console.log(`Removing like for ${id}`);
        await dispatch(deleteLike({ itemId: id, itemType }));
        toast({
          title: `You removed ${Name} from likes`,
          variant: "destructive",
        });
      }
      console.log(`Fetching updated like list for ${id}`);
      // await dispatch(getLikeList());
    } catch (error) {
      console.error("Error liking/unliking the item:", error);
      setIsLiked(isLiked);
    }
  }, [session, toast, Name, dispatch, id, itemType, isLiked]);

  return { isLiked, handleLike, totalLikes };
}

// import { useState, useCallback, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { AppDispatch } from "@/redux/store";
// import { useToast } from "@/components/ui/use-toast";
// import { addLike, deleteLike } from "@/redux/slice/like/like.slice";
// import { useDispatch } from "react-redux";

// export function useLikeHandler(
//   id: string,
//   Name: string,
//   isInitialLiked: boolean,
//   itemType: "tool" | "prompt",
//   upVoteCount?: number
// ) {
//   const [isLiked, setIsLiked] = useState(isInitialLiked);
//   const [totalLikes, setTotalLikes] = useState(upVoteCount);
//   const { toast } = useToast();
//   const { data: session } = useSession();
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     setIsLiked(isInitialLiked);
//   }, [isInitialLiked]);

//   const handleLike = useCallback(async () => {
//     if (!session || !session?.user) {
//       toast({
//         title: "Please log in to like",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsLiked((prevState) => !prevState); // Flip the isLiked state
//     const newLikedState = !isLiked; // Capture the new state

//     try {
//       if (newLikedState) {
//         await dispatch(addLike({ itemId: id, itemType }));
//         setTotalLikes((prevCount:any) => prevCount + 1);
//         toast({
//           title: `You liked ${Name}`,
//           variant: "success",
//         });
//       } else {
//         await dispatch(deleteLike({ itemId: id, itemType }));
//         setTotalLikes((prevCount:any) => prevCount - 1);
//         toast({
//           title: `You removed ${Name} from likes`,
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error liking/unliking the item:", error);
//       // Revert the state back if there's an error
//       setIsLiked(isLiked);
//     }
//   }, [session, toast, Name, dispatch, id, itemType, isLiked,]);

//   return { isLiked, handleLike, totalLikes, setTotalLikes };
// }
