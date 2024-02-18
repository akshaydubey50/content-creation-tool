import { NextResponse } from "next/server";
import AirtableModel from "@/models/airtableModel";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";
import { getCache, setCache } from "@/helper/helper";

export async function GET() { 
  const headers = {
    Authorization: `Bearer ${AirtableConf.BEARER_TOKEN}`,
  };

  try {
    let airtableProductList: AirtableModel[] = [];
    let cacheData = await getCache("airtableProductList");

    if (cacheData !== null) {
      return NextResponse.json(
        {
          success: true,
          data: cacheData,
        },
        { status: 200 }
      );
    }

    const maxConcurrentRequests = 2; // Adjust concurrency as needed

    let offset = null;
    do {
      const response: any = await axios.get(
        `${AirtableConf.BASE_URL}/${AirtableConf.BASE_ID}/${AirtableConf.TABLE_ID}`,
        {
          headers,
          params: {
            // maxRecords: 30, // Adjust maxRecords as needed
            offset,
          },
        }
      );

      if (response.status === 200) {
        const records: AirtableModel[] = (await response.data[
          "records"
        ]) as AirtableModel[];
        airtableProductList.push(...records);
        offset = response.data.offset;
      }
    } while (offset);

    await setCache("airtableProductList", airtableProductList);

    return NextResponse.json(
      {
        success: true,
        data: airtableProductList,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
