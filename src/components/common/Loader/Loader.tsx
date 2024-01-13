import React from 'react'
import "./Loader.css"

export default function Loader() {
  return (
    <div aria-label="Loading..." role="status" className="flex items-center justify-center h-screen space-x-2">
      <div className="spinner"></div>
    </div>
  )
}
