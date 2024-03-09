import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { NextResponse } from "next/server";
import AirtableModel from "@/models/airtableModel";
import { DOMAIN_URL } from "@/helper/helper";

// Utility function to fetch bookmarked products from Supabase
async function fetchBookmarkedProducts(user: any): Promise<Set<string>> {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("bookmark")
    .select("product_id")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(`Failed to fetch bookmarks: ${error.message}`);
  }

  return new Set(data.map((item) => item.product_id));
}

// Utility function to fetch products from Airtable
async function fetchAirtableProducts(): Promise<AirtableModel[]> {
  const URL = DOMAIN_URL();
  const res = await fetch(URL + "/api/tools");
  if (!res.ok) {
    throw new Error(`Failed to fetch Airtable products: ${res.statusText}`);
  }
  const json = await res.json();
  return json["data"];
}

// Utility function to get user from cookies
async function getUserFromCookies(cookies: any): Promise<any> {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }

  return data?.user;
}

// Main function to handle GET requests
export async function GET() {
  try {
    const user = await getUserFromCookies(cookies);
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 401 });
    }

    // const cachedBookmarks = getCache("bookmarks");
    let bookmarkedProductIds: Set<string>;
    /*  if (cachedBookmarks) {
      bookmarkedProductIds = new Set(cachedBookmarks);
    } else {
      bookmarkedProductIds = await fetchBookmarkedProducts(user);
      setCache("bookmarks", Array.from(bookmarkedProductIds));
    } */
    bookmarkedProductIds = await fetchBookmarkedProducts(user);
    const airtableProducts = await fetchAirtableProducts();
    const bookmarkedProducts = airtableProducts.filter((product) =>
      bookmarkedProductIds.has(product.id)
    );

    if (bookmarkedProducts.length === 0) {
      return NextResponse.json(
        { msg: "No bookmarked products found" },
        { status: 200 }
      );
    }

    return NextResponse.json({ data: bookmarkedProducts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "An error occurred" }, { status: 500 });
  }
}
