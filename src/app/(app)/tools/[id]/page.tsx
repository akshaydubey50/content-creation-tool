
import { Metadata, ResolvingMetadata } from "next";
import ProductDetail from "./product-detail"; // Import client-side component
import { AirtableModel } from "@/models/airtable.model";
import { APPConf } from "@/conf/conf";

// Props for generateMetadata
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Fetch product metadata dynamically
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Read route params
  const id = params.id;

  // Fetch data from API (replace with your actual API)
  const product = await fetch(`${APPConf.BASE_URL}/api/tools`).then((res) => {
    console.log("res", res);
    return res.json();
  });
  const productMatched = product?.data?.filter((product: AirtableModel) => {
    const formattedTitle = product?.fields?.Name?.toLowerCase()
      ?.trim()
      ?.replace(/\s/g, "-");
    return formattedTitle === id;
  });
  console.log("productMatched", productMatched);
  // Optionally access and extend (rather than replace) parent metadata

  // Return dynamic metadata
  return {
    title: productMatched?.fields?.Name || "Product Detail",
    description: productMatched?.fields?.Description || "Product description",

    openGraph: {
      title: productMatched?.fields?.Name || "Product Detail",
      description: productMatched?.fields?.Description || "Product description",
    },
  };
}

// Render the client-side component in this server-side component
export default function Page({ params }: Props) {
  return <ProductDetail params={params} />;
}
