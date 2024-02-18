import React, { useContext, createContext, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export const likedToolData = createContext();

export function LikedToolContextProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [islikeFilled, setIsLikeFilled] = useState(false);
  const [likedTool, setLikedTool] = useState([]);

  const supabase = createClientComponentClient();

  const handleLikedClick = async () => {
    if (pathname !== "/") {
      router.push("/");
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      const { data, error } = await supabase
        .from("likes")
        .select("product_id")
        .eq("user_id", session.user?.id);

      if (!data) <>No Tool bookmarked Yet</>;
      console.log("user liked data:", data);
      setLikedTool(data);
    }
    setIsLikeFilled(!islikeFilled);
  };

  return (
    <>
      <likedToolData.Provider
        value={{
          islikeFilled,
          handleLikedClick,
          setIsLikeFilled,
          setLikedTool,
          likedTool,
        }}
      >
        {children}
      </likedToolData.Provider>
    </>
  );
}

export const useLikedToolContextData = () => {
  return useContext(likedToolData);
};
