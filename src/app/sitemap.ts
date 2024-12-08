import { MetadataRoute } from "next";
import { APPConf } from "@/conf/conf";
import {
  AirtableModel,
  PropmtResourceModel,
  ResourceModel,
} from "@/models/airtable.model";

// Helper function to safely fetch data
async function safeFetch(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
      next: {
        revalidate: 3600 // Revalidate every hour
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Response is not JSON");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { data: [] };
  }
}

async function fetchTools() {
  const { data } = await safeFetch(`${APPConf.BASE_URL}/api/tools`);
  return data.map((product: AirtableModel) => ({
    name: product?.fields?.Name?.toLowerCase?.()?.trim?.()?.replace(/\s/g, "-") || "",
  })).filter((tool:any) => tool.name); // Filter out items with empty names
}

async function fetchPrompts() {
  const { data } = await safeFetch(`${APPConf.BASE_URL}/api/prompts`);
  return data.map((prompt: PropmtResourceModel) => ({
    name: prompt?.fields?.Name?.toLowerCase?.()?.trim?.()?.replace(/\s/g, "-") || "",
  })).filter((prompt:any) => prompt.name);
}

async function fetchResources() {
  const { data } = await safeFetch(`${APPConf.BASE_URL}/api/resources`);
  return data.map((resource: ResourceModel) => ({
    name: resource?.fields?.Name?.toLowerCase?.()?.trim?.()?.replace(/\s/g, "-") || "",
  })).filter((resource:any) => resource.name);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APPConf.BASE_URL;

  // Fetch all data concurrently
  const [tools, resources, prompts] = await Promise.all([
    fetchTools().catch(() => []),
    fetchResources().catch(() => []),
    fetchPrompts().catch(() => []),
  ]);

  // Static routes with their last modified dates
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/experts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/prompts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/submit-a-tool`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic routes
  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...tools.map((tool:any) => ({
      url: `${baseUrl}/tools/${tool.name}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...prompts.map((prompt:any) => ({
      url: `${baseUrl}/prompts/${prompt.name}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...resources.map((resource:any) => ({
      url: `${baseUrl}/resources/${resource.name}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}