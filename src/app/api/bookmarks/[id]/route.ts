import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { DOMAIN_URL } from "@/helper/helper";

export async function POST(request: Request) {
  const id = request.url.split("bookmarks/")[1];

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if no user cookies
  if (!user) throw Error("user not found");

  // add bookmark list from db
  const { data: bookmark, error: err } = await supabase
    .from("bookmark")
    .insert([{ user_id: user?.id, product_id: id }])
    .select();
  console.log("bookmark", bookmark);

  if (err) {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 400 });
  }

  return NextResponse.json({ data: "Product bookmarked" }, { status: 201 });
}

export async function DELETE(request: Request) {
  const id = request.url.split("bookmarks/")[1];

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if no user cookies
  if (!user) throw Error("user not found");

  // deleting bookmark list from db
  const { data: bookmark, error: err } = await supabase
    .from("bookmark")
    .delete()
    .eq("user_id", user?.id)
    .eq("product_id", id);

  if (err) {
    return NextResponse.json(
      {
        msg: "Something went wrong or Product not bookmarked",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json(
    { data: "Bookmark Product deleted" },
    { status: 201 }
  );
}
