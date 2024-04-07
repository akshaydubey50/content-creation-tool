import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { NextResponse } from "next/server";
import AirtableModel from "@/models/airtableModel";
import { DOMAIN_URL, getCache, setCache } from "@/helper/helper";

// get likes product list by user
export async function GET() {
    const URL = DOMAIN_URL();
    let start = Date.now();

    const supabase = createRouteHandlerClient<Database>({ cookies });

    // get likes list from db
    const { data, error } = await supabase
        .from("likes")
        .select('user_id, product_id');

    const productUpVoteCount = data?.reduce((counts: any, upvote: any)=>{
        const {product_id}=upvote
        counts[product_id] = (counts[product_id] || 0) + 1;
        return counts;
  },{})
    console.log('productUpVoteCount',productUpVoteCount)

    //call airtable api and do filteration and return the list of likes
    return NextResponse.json(
        {
            data: productUpVoteCount,
        },
        { status: 200 }
    );
}
