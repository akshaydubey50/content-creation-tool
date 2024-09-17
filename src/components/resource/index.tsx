import React from 'react'
import ResourceSidebar from './ResourceSidebar'
import ResourceList from './ResourceList'

export default function Resource() {
  return (
    <>
    <section className='grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 max-w-8xl mx-auto'>
        <div className="col-span-1  md:col-span-2">
    <ResourceSidebar />
        </div>
              <div className="col-span-1 md:col-span-10">
    <ResourceList />
    </div>
    </section>
    </>
  )
}
