'use client'
import React from 'react'
import dummy from '../../../dummy'
import AllPost from '@/components/AllPost'

const Page = () => {
  
  return (
    <div className="h-screen bg-gray-50 flex flex-col items-start justify-start overflow-y-auto py-5 px-2">
      <h1 className=" playwrite-hu-head text-base mt-6 w-full font-bold mb-2">
        <p className='text-center'>All Posts</p>
      </h1>

 
      <AllPost />
    </div>
  )
}

export default Page