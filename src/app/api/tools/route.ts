import { NextResponse } from "next/server";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";
import AirtableModel from "@/models/airtableModel";

// Define a type for the cache
type AirtableCache = {
  data: AirtableModel[] | null;
  timestamp: number;
};

// Initialize the cache with the defined type
let airtableCache: AirtableCache = {
  data: null,
  timestamp: 0,
};

// Set cache TTL to 30 seconds
const CACHE_TTL = 30 * 1000; // 30 seconds

export async function GET() {
  const headers = {
    Authorization: `Bearer ${AirtableConf.BEARER_TOKEN}`,
  };

  try {
    const now = Date.now();

    // Check if cache is still valid
    if (airtableCache.data && (now - airtableCache.timestamp < CACHE_TTL)) {
      console.log("Serving from cache");
      return NextResponse.json(
        {
          success: true,
          data: airtableCache.data,
        },
        { status: 200 }
      );
    }

    console.log("Fetching fresh data from Airtable");

    let airtableProductList: AirtableModel[] = [];
    let offset: string | null = null;

    do {
      const response:any = await axios.get(
        `${AirtableConf.BASE_URL}/${AirtableConf.BASE_ID}/${AirtableConf.TABLE_ID}`,
        {
          headers,
          params: {
            offset,
          },
        }
      );

      if (response.status === 200) {
        const records: AirtableModel[] = response.data.records;
        airtableProductList.push(...records);
        offset = response.data.offset;
      } else {
        break;
      }
    } while (offset);

    // Update cache
    airtableCache = {
      data: airtableProductList,
      timestamp: Date.now(),
    };

    console.log("Cache updated with fresh data");

    return NextResponse.json(
      {
        success: true,
        data: airtableProductList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
