'use client'
import React from 'react'
import dummy from '../../../dummy'
import AllPost from '@/components/AllPost'
import { useDisplayMode } from "@/hooks/DisplayModeProvider";


const Page = () => {

  const { mode, toggleMode, colorSchema } = useDisplayMode();
  
  return (
    <div className={` ${mode === 'light' ? 'bg-white' : 'bg-zinc-900'} h-screen bg-gray-50 flex flex-col items-start justify-start overflow-y-auto py-5 px-2`}>
      <h1 className=" playwrite-hu-head text-base mt-6 w-full font-bold mb-2">
        <p className={`text-center ${mode === 'light' ? 'text-zinc-900' : 'text-white'}`}>All Posts</p>
      </h1>

 
      <AllPost />
    </div>
  )
}

export default Page