import { productUpVoteTotalCountById } from "@/helper/helper"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


const useUpvoteCount = (id: any) => {
    const supabase = createClientComponentClient();
    const [totalCount, setTotalCount] = useState(0);
    const userAuthData = useSelector((store: RootState) => store.user.userSession);

    const productUpVoteCount = async () => {
        // Get's the product count
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

    const updateUpVoteCount = async (id: string) => {
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

        if (likes.length === 0) {
            const { data: upvote, error: err } = await supabase
            .from("likes")
            .insert([{ user_id: user?.id, product_id: id }])
            .select();
            console.log('While Adding product....',upvote)
            productUpVoteCount();    
            return upvote
        }

        if (likes.length > 0) {
            console.log('While deleting product....')
            const { data: likes, error: error } = await supabase
                .from("likes")
                .delete()
                .eq("user_id", user?.id)
                .eq("product_id", id);
            console.log('While Deleting product....', likes)
            productUpVoteCount();
            return likes
        }

    }

    useEffect(() => {
        productUpVoteCount()
    }, [id])
    
    return {
        totalCount,
        updateUpVoteCount,
        productUpVoteCount,
    }


}
export default useUpvoteCount