import { MetadataRoute } from "next";
import { APPConf } from "@/conf/conf";
import {
  AirtableModel,
  PropmtResourceModel,
  ResourceModel,
  ExpertModel
} from "@/models/airtable.model";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postsQuery } from "@/sanity/lib/queries";
import { SanityDocument } from "next-sanity";

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

// async function fetchResources() {
//   const { data } = await safeFetch(`${APPConf.BASE_URL}/api/resources`);
//   return data.map((resource: ResourceModel) => ({
//     name: resource?.fields?.Name?.toLowerCase?.()?.trim?.()?.replace(/\s/g, "-") || "",
//   })).filter((resource:any) => resource.name);
// }

async function fetchExperts() {
  const { data } = await safeFetch(`${APPConf.BASE_URL}/api/experts`);
  return data.map((expert: ExpertModel) => ({
    name: `${expert?.fields?.['First Name']?.toLowerCase?.()?.trim?.()}${expert?.fields?.['Last Name']?.toLowerCase?.()?.trim?.()}`?.replace(/\s/g, "-") || "",
  })).filter((resource: any) => resource.name);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = APPConf.BASE_URL;

  // Fetch all data concurrently
  const [tools, prompts,experts] = await Promise.all([
    fetchTools().catch(() => []),
    fetchPrompts().catch(() => []),
    fetchExperts().catch(() => []),
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
    // {
    //   url: `${baseUrl}/resources`,
    //   lastModified: new Date(),
    //   changeFrequency: 'daily',
    //   priority: 0.9,
    // },
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

  const dynamicRoutes = [
    ...tools.map((tool: any) => ({
      url: `${baseUrl}/tools/${tool.name}`,
      lastModified: new Date(),
    })),
    ...prompts.map((prompt: any) => ({
      url: `${baseUrl}/prompts/${prompt.name}`,
      lastModified: new Date(),
    })),
    // ...resources.map((resource:any) => ({
    //   url: `${baseUrl}/resources/${resource.name}`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.7,
    // })),
    ...experts.map((resource: any) => ({
      url: `${baseUrl}/experts/${resource.name}`,
      lastModified: new Date(),
    })),
    ...blogs.map((blog: any) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: blog.lastModified,
    })),
    ...experts.map((expert: any) => ({
      url: `${baseUrl}/experts/${expert.slug}`,
      lastModified: expert.lastModified,
    })),
    ...projects.map((project: any) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.lastModified,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
