import { NextResponse } from "next/server";
import AirtableModel from "@/models/airtableModel";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";

export async function GET(request: Request) {
  const headers = {
    Authorization: `Bearer ${AirtableConf.BEARER_TOKEN}`,
  };
  console.log(
    `${AirtableConf.BASE_URL}/${AirtableConf.BASE_ID}/${AirtableConf.TABLE_ID}`
  );
  try {
    const response = await axios.get(
      `${AirtableConf.BASE_URL}/${AirtableConf.BASE_ID}/${AirtableConf.TABLE_ID}`,
      {
        headers,
      }
    );

    if (response.status === 200) {
      const filterData: AirtableModel[] = response.data[
        "records"
      ] as AirtableModel[];
      return NextResponse.json({
        filterData,
        success: "true",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
