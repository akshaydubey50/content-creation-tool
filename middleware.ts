import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "@/types/supabase";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest, res: NextResponse  ) {
  if (
    req.nextUrl.pathname.includes("/api/bookmarks") ||
    req.nextUrl.pathname.includes("/api/likes")
  ) {
    console.log("req.nextUrl.pathname", req.nextUrl.pathname);
    console.log("req.nextUrl.pathname", req.nextUrl.pathname);
  }
}
