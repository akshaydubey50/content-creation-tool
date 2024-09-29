// import { useState, useCallback } from "react";
// import { useDispatch } from "react-redux";
// import {
//   addBookmark,
//   deleteBookmark,
// } from "@/redux/slice/bookmark/bookmark.slice";
// import { useSession } from "next-auth/react";
// import { useToast } from "@/components/ui/use-toast";
// import { AppDispatch } from "@/redux/store";

// export function useBookmarkHandler(
//   id: string,
//   Name: string,
//   isInitialBookmarked: boolean,
//   itemType: string // Add itemType parameter
// ) {
//   const [isBookMarked, setIsBookMarked] = useState(isInitialBookmarked);
//   const { toast } = useToast();
//   const { data: session } = useSession();
//   const dispatch = useDispatch<AppDispatch>();

//   const handleBookmark = useCallback(() => {
//     if (!session || !session?.user) {
//       toast({
//         title: "Please log in to bookmark",
//         variant: "destructive",
//       });
//       return;
//     }

//     setIsBookMarked((prevState) => !prevState);

//     const bookmarkData = { itemId: id, itemType }; // Include itemType in the dispatch
//     if (isBookMarked) {
//       toast({
//         title: `You removed ${Name} from bookmarks`,
//         variant: "destructive",
//       });
//       dispatch(deleteBookmark(bookmarkData)); // Pass itemId and itemType
//     } else {
//       toast({
//         title: `You bookmarked ${Name}`,
//         variant: "success",
//       });
//       dispatch(addBookmark(bookmarkData)); // Pass itemId and itemType
//     }
//   }, [session, isBookMarked, toast, Name, dispatch, id, itemType]);

//   return { isBookMarked, handleBookmark };
// }

import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  addBookmark,
  deleteBookmark,
} from "@/redux/slice/bookmark/bookmark.slice";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { AppDispatch } from "@/redux/store";

export function useBookmarkHandler(
  id: string,
  Name: string,
  isInitialBookmarked: boolean,
  itemType: "tool" | "prompt"
) {
  const [isBookMarked, setIsBookMarked] = useState(isInitialBookmarked);
  const { toast } = useToast();
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const handleBookmark = useCallback(() => {
    if (!session || !session?.user) {
      toast({
        title: "Please log in to bookmark",
        variant: "destructive",
      });
      return;
    }

    const updatedBookmarkState = !isBookMarked;
    setIsBookMarked(updatedBookmarkState);

    const bookmarkData = { itemId: id, itemType: itemType }; // Include itemType in the dispatch

    if (updatedBookmarkState) {
      toast({
        title: `You bookmarked ${Name}`,
        variant: "success",
      });
      dispatch(addBookmark(bookmarkData)); // Pass itemId and itemType
    } else {
      toast({
        title: `You removed ${Name} from bookmarks`,
        variant: "destructive",
      });
      dispatch(deleteBookmark(bookmarkData)); // Pass itemId and itemType
    }
  }, [session, isBookMarked, toast, Name, dispatch, id, itemType]);

  return { isBookMarked, handleBookmark };
}
