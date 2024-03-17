import { Redis } from "@upstash/redis";
import { RedisConf } from "@/conf/conf";
import AirtableModel from "@/models/airtableModel";


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

export const isProductBookmarked=(
  productId: string,
  bookmarkList: AirtableModel[]
) =>{
  if (bookmarkList) {
    // return bookmarkList?.some((bookmark) => bookmark?.id === product.id);
    return bookmarkList.some((bookmark) => bookmark?.id === productId);
  }
  return false;
}
