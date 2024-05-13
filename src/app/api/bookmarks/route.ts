import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { NextResponse } from "next/server";
import AirtableModel from "@/models/airtableModel";
import { DOMAIN_URL, getCache, setCache } from "@/helper/helper";

// get bookmark product list by user
export async function GET() {
  const URL = DOMAIN_URL();
  let start = Date.now();

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if no user cookies
  if (!user) throw Error("user not found");

  // get bookmark list from db
  const { data, error } = await supabase
    .from("bookmark")
    .select("product_id")
    .eq("user_id", user?.id);

  //if something went wrong while fetching the data from db
  if (error) throw Error(error.message);

  console.log('bookmark data',data)
  const productSet = new Set(data.map((item) => item.product_id));

  let airtableProductList: AirtableModel[];

  const res = await fetch(URL + "/api/tools");
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
    return NextResponse.json(
      { msg: "No bookmark product yet" },
      { status: 200 }
    );
  }

  //call airtable api and do filteration and return the list of bookmark
  return NextResponse.json(
    {
      data: filterProductList,
    },
    { status: 200 }
  );
}
