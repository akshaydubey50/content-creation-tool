import { sanityFetch } from '@/sanity/lib/fetch'
import { postsQuery } from '@/sanity/lib/queries'
import { SanityDocument } from 'next-sanity'
import React from 'react'
import Posts from './Posts'



const Page = async () => {

  const posts = await sanityFetch<SanityDocument[]>({ query: postsQuery })
  console.log("all", { posts })

  return (
    <div className='my-5 container'>
      <Posts posts={posts}/>
    </div>
  )
}

export default Page