import { productUpVoteTotalCountById } from "@/helper/helper"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


const useUpvoteCount = (id: any) => {
    const supabase = createClientComponentClient();
    const [totalCount, setTotalCount] = useState(0);
    const userAuthData = useSelector((store: RootState) => store.user.userSession);

    const productUpVoteCount = async () => {
        const productTotalCount: any = await productUpVoteTotalCountById();
        const upvoteCount = productTotalCount[id];
        if (productTotalCount.hasOwnProperty(id)) {
            setTotalCount(upvoteCount);
            return upvoteCount
        }
        else {
            setTotalCount(0);
            return 0
        }
    }

    useEffect(() => {
        productUpVoteCount()
    }, [id])

    const updateUpVoteCount = async (id: string) => {
        if (!userAuthData) {
            return
        } else {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            const { data: likes, error: error } = await supabase
                .from("likes")
                .select()
                .eq("user_id", user?.id)
                .eq("product_id", id);

            if (error) {
                throw new Error('Something went wrong')
            }

            if (likes.length > 0) {
                const { data: likes, error: error } = await supabase
                    .from("likes")
                    .delete()
                    .eq("user_id", user?.id)
                    .eq("product_id", id);
                return likes
            }

            const { data: upvote, error: err } = await supabase
                .from("likes")
                .insert([{ user_id: user?.id, product_id: id }])
                .select();
            return upvote
        }
    }

    return {
        totalCount,
        updateUpVoteCount,
        productUpVoteCount,
    }


}
export default useUpvoteCount