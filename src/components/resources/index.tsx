import React from 'react'
import ResourceSidebar from './ResourceSidebar'
import ResourceList from './ResourceList'

export default function Resource() {
  const itemsPerPageCount = 12;
  return (
    <>
    
      <ResourceList itemsCount={itemsPerPageCount} />

    </>
  )
}
