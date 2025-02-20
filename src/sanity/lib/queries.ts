import { groq } from "next-sanity";

// Get all posts
export const postsQuery = groq`*[_type == "post"] {
  _createdAt,
  title,
  slug,
  mainImage,
  "imageURL": mainImage.asset->url,         
  "authorName": author->name,
}`; 

// Get a single post by its slug
  export const postQuery = groq`*[_type == "post" && slug.current == $slug][0]{ 
      title, description, mainImage, body,
      "headings":body[style in ["h2","h3"]],
        "imageURL": mainImage.asset->url,  
          "authorName": author->name,
    }`; 

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post" && defined(slug.current)][]{
    "params": { "slug": slug.current }
  }`;