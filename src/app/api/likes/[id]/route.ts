import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { DOMAIN_URL } from "@/helper/helper";

export async function POST(request: Request) {
  const id = request.url.split("likes/")[1];

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if no user cookies
  if (!user) throw Error("user not found");

  // add likes list from db
  const { data: likes, error: err } = await supabase
    .from("likes")
    .insert([{ user_id: user?.id, product_id: id }])
    .select();

  if (err) {
    return NextResponse.json({ msg: "Something went wrong" }, { status: 400 });
  }

  return NextResponse.json({ data: "Product Liked" }, { status: 201 });
}

export async function DELETE(request: Request) {
  const id = request.url.split("likes/")[1];

  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // if no user cookies
  if (!user) throw Error("user not found");

  // deleting likes list from db
  const { data: likes, error: err } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", user?.id)
    .eq("product_id", id);

  if (err) {
    return NextResponse.json(
      {
        msg: "Something went wrong or Product not liked",
      },
      {
        status: 400,
      }
    );
  }

  return NextResponse.json({ data: "Product Liked" }, { status: 201 });
}
