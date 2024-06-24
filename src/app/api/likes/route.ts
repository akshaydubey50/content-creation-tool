import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { NextResponse } from "next/server";
import AirtableModel from "@/models/airtable.model";
import { DOMAIN_URL, getCache, setCache } from "@/helper/helper";

// get likes product list by user
export async function GET() {
  const URL = DOMAIN_URL();
  let start = Date.now();

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if no user cookies
  if (!user) throw Error("user not found");

  // get likes list from db
  const { data, error } = await supabase
    .from("likes")
    .select("product_id")
    .eq("user_id", user?.id);

  //if something went wrong while fetching the data from db
  if (error) throw Error(error.message);

  const productSet = new Set(data.map((item) => item.product_id));

  let airtableProductList: AirtableModel[];

  const res = await fetch("http://localhost:3000/api/tools");
  const json = await res.json();
  airtableProductList = json["data"];

  const filterProductList = airtableProductList.filter(
    (product: AirtableModel) => {
      if (productSet.has(product.id)) {
        return product;
      }
    }
  );

  if (!filterProductList) {
    return NextResponse.json({ msg: "No likes product yet" }, { status: 200 });
  }

  //call airtable api and do filteration and return the list of likes
  return NextResponse.json(
    {
      data: filterProductList,
    },
    { status: 200 }
  );
}
