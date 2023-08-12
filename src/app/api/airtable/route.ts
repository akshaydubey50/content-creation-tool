import { NextResponse } from "next/server";
import AirtableModel from "@/models/airtableModel";
import axios from "axios";
import { AirtableConf } from "@/conf/conf";
import puppeteer from "puppeteer";

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

async function takeScreenshot(url: string, outputFilePath: string) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" }); // Wait until the page loads completely

    // Customize the viewport size if needed
    await page.setViewport({ width: 1280, height: 720 });

    // Take the screenshot
    await page.screenshot({ path: outputFilePath, type: "jpeg", quality: 80 });

    console.log(`Screenshot saved to: ${outputFilePath}`);

    await browser.close();
  } catch (error) {
    console.error("Error taking the screenshot:", error);
  }
}
