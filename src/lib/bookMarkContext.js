import React, { useContext, createContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export const bookMarkedData = createContext();

export function BookMarkedToolContextProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  const [isBookMarkFilled, setIsBookMarkFilled] = useState(false);
  const [bookMarkedTool, setBookMarkedTool] = useState([]);

  const supabase = createClientComponentClient();

  const handleBookMarkedClick = async () => {
    if (pathname !== "/") {
      router.push("/");
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.user) {
      const { data, error } = await supabase
        .from("bookmark")
        .select("product_id")
        .eq("user_id", session.user?.id);

      if (!data) <>No Tool bookmarked Yet</>;
      console.log("user bookmarked data:", data);
      setBookMarkedTool(data);
    }
    setIsBookMarkFilled(!isBookMarkFilled);
  };

  return (
    <>
      <bookMarkedData.Provider
        value={{
          isBookMarkFilled,
          handleBookMarkedClick,
          setIsBookMarkFilled,
          setBookMarkedTool,
          bookMarkedTool,
        }}
      >
        {children}
      </bookMarkedData.Provider>
    </>
  );
}

export const useBookMarkedToolContextData = () => {
  return useContext(bookMarkedData);
};
