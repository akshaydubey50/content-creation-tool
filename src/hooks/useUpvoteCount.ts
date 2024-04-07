import { productUpVoteTotalCountById } from "@/helper/helper"
import { useEffect, useState } from "react";

const useUpvoteCount =(id:string)=>{
   const [totalCount,setTotalCount]=useState(0);

    const productUpVoteCount: any = async () => {
        const productTotalCount: any = await productUpVoteTotalCountById();
     
        if (productTotalCount.hasOwnProperty(id)) {
            const upvoteCount = productTotalCount[id];
            setTotalCount(upvoteCount);
            return upvoteCount
        }
        else {
            return 0
        }
    }

    useEffect(() => {
        productUpVoteCount(id)
    }, [id])


    return {
        totalCount,
        productUpVoteCount,
    }

   
}
export default useUpvoteCount