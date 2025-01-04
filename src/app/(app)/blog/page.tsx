import { sanityFetch } from '@/sanity/lib/fetch'
import { postsQuery } from '@/sanity/lib/queries'
import { SanityDocument } from 'next-sanity'
import React from 'react'
import Posts from './posts'
import { useRouter } from 'next/navigation'



const Page = async() => {
  // const router = useRouter();

  // if (process.env.NEXT_PUBLIC_SHOW_ROUTE !== 'true') {
  //   router.push('/'); // Redirect to another page
  //   return null;
  // }
    const posts  = await sanityFetch<SanityDocument[]>({query:postsQuery})
    console.log("all",{posts})
  return (
    <div className='my-5'>
        <Posts posts={posts}/>
    </div>
  )
}

export default Page