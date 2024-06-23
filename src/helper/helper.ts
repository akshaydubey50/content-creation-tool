import { Redis } from "@upstash/redis";
import { RedisConf } from "@/conf/conf";
import AirtableModel from "@/models/airtable.model";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClientComponentClient();

const redis = new Redis({
  url: RedisConf.URL,
  token: RedisConf.TOKEN,
});

export const getCache = async (key: string) => {
  const cache = await redis.get(key);
  return cache;
};

export const setCache = async (key: string, value: any) => {
  await redis.set(key, value);
};

export const DOMAIN_URL = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;
};

export const isProductBookmarked = (
  productId: string,
  bookmarkList: AirtableModel[]
) => {
  if (bookmarkList) {
    return bookmarkList.some((bookmark) => bookmark?.id === productId);
  }
  return false;
};

// Give All Product Data Count entered in db
export const productUpVoteTotalCountById = async () => {
  const { data, error } = await supabase
    .from("likes")
    .select("user_id, product_id");
  const productUpVoteCount = await data?.reduce((counts: any, upvote: any) => {
    const { product_id } = upvote;
    counts[product_id] = (counts[product_id] || 0) + 1;
    return counts;
  }, []);
  // console.log('log 1 ###',productUpVoteCount)
  return productUpVoteCount;
};

// Check product_id  is saved in db or not
export const isProductLikedByUser = async (productId: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.log("User Not Signed In");
  }
  const { data: likes, error: error } = await supabase
    .from("likes")
    .select()
    .eq("user_id", user?.id)
    .eq("product_id", productId);
  // console.log("log 2 ###")
  if (likes == null || likes.length == 0) return false;
  if (likes[0]["product_id"] == productId) {
    return true;
  }
  return false;
};

// Check product_id  is saved in db or not
export const isProductBookmarkedByUser = async (productId: number) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User Not Signed In");
  }
  const { data: likes, error: error } = await supabase
    .from("bookmark")
    .select()
    .eq("user_id", user?.id)
    .eq("product_id", productId);
  // console.log("log 2 ###")
  if (likes == null || likes.length == 0) return false;
  if (likes[0]["product_id"] == productId) {
    return true;
  }
  return false;
};
