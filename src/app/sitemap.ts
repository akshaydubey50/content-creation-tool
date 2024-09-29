import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.contentcreation.fyi/tools",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://www.contentcreation.fyi/contact",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://www.contentcreation.fyi/prompt",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
    {
      url: "https://www.contentcreation.fyi/resources",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
  ];
}
import { MetadataRoute } from "next";
import { APPConf } from "@/conf/conf";
import {
  AirtableModel,
  PropmtResourceModel,
  ResourceModel,
} from "@/models/airtable.model";

async function fetchTools() {
  try {
    // Fetch data from API
    const response = await fetch(`${APPConf.BASE_URL}/api/tools`);
    const { data } = await response.json();

    // Find the matching product
    return data.map((product: AirtableModel) => {
      return {
        name: product?.fields?.Name?.toLowerCase()?.trim()?.replace(/\s/g, "-"),
        // description: product?.fields?.Description?.toLowerCase(),
      };
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return [];
  }
}

async function fetchPrompts() {
  try {
    // Fetch data from API
    const response = await fetch(`${APPConf.BASE_URL}/api/prompts`);
    const { data } = await response.json();

    // Find the matching product
    return data.map((prompt: PropmtResourceModel) => {
      return {
        name: prompt?.fields.Name?.toLowerCase()?.trim()?.replace(/\s/g, "-"),
      };
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return [];
  }
}

async function fetchResources() {
  try {
    // Fetch data from API
    const response = await fetch(`${APPConf.BASE_URL}/api/resources`);
    const { data } = await response.json();

    // Find the matching product
    return data.map((product: ResourceModel) => {
      return {
        name: product?.fields?.Name?.toLowerCase()?.trim()?.replace(/\s/g, "-"),
        // description: product?.fields?.Description?.toLowerCase(),
      };
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APPConf.BASE_URL;

  const tools = (await fetchTools()) || [];
  const resources = (await fetchResources()) || [];
  const prompts = (await fetchPrompts()) || [];

  const staticRoutes = [
    "",
    "/about-us",
    "/contact",
    "/experts",
    "/prompt",
    "/resources",
    "/submit-a-tool",
    "/tools",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...tools.map((tool: any) => ({
      url: `${baseUrl}/tools/${tool.name}`,
      lastModified: new Date(),
    })),
    ...prompts.map((prompt: any) => ({
      url: `${baseUrl}/prompts/${prompt.name}`,
      lastModified: new Date(),
    })),
    ...resources.map((resource: any) => ({
      url: `${baseUrl}/resources/${resource.name}`,
      lastModified: new Date(),
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
