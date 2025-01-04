import type { SanityDocument } from "@sanity/client";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ posts = [] }: { posts: SanityDocument[] }) => {
  const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group block bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden"
          >
            {post?.mainImage && (
              <div 
              key={post._id}
              className="aspect-w-16 aspect-h-9 relative">
                <Image
                  src={post.imageURL}
                  alt={post.mainImage.alt || post.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-90 transition-opacity duration-200"
                  priority
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-medium text-xl mb-2 group-hover:text-primary transition-colors duration-200">
                {post.title}
              </h3>
              <p className="text-gray-500 text-sm">
                {convertDate(post._createdAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Posts;

