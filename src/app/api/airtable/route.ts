import { NextResponse } from "next/server";
import AirtableModel from "@/models/airtableModel";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";


export async function GET(request: Request) {
  // check if req is having any id
  // if yes then grab and send the details of that product
  // else send all list of product
  const headers = {
    Authorization: `Bearer ${AirtableConf.BEARER_TOKEN}`,

  };
  console.log(
    `${AirtableConf.BASE_URL}/${AirtableConf.BASE_ID}/${AirtableConf.TABLE_ID}`
  );

  let offset = null;
  const allRecords: AirtableModel[] = [];

  try {

    do {
      const response: any = await axios.get(
        `${AirtableConf.BASE_URL}/${AirtableConf.BASE_ID}/${AirtableConf.TABLE_ID}`,
        {
          headers,
          params: {
            offset,
          },
        }
      );
      console.log('response::', response)
      if (response.status === 200) {
        const records: AirtableModel[] = response.data[
          "records"
        ] as AirtableModel[];
        allRecords.push(...records);
        offset = response.data.offset;
      }
    }

    while (offset)
    return NextResponse.json({
      filterData: allRecords,
      success: "true",
    });

  } catch (error) {
    console.log(error);
  }
}
