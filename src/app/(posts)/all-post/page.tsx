'use client'
import React from 'react'
import dummy from '../../../dummy'
import AllPost from '@/components/AllPost'

const Page = () => {
  return (
    <div className="h-screen bg-gray-50 flex flex-col items-start justify-start overflow-y-auto py-5 px-2">
      <h1 className="text-3xl playwrite-hu-head font-bold mb-2">All Posts</h1>

 
      <AllPost />
    </div>
  )
}

export default Page