'use client'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const Navbar = () => {
    const pathnamePosts = ["/all-post", "/daily-tracker-post"]
    const router = useRouter();
      const pathname = usePathname()
const printR = () => {
    console.log("hello roupathname ter" , pathname);

}  
return (
    <div className="w-full h-16 bg-gradient-to-r from-violet-600 to-violet-800 text-white flex items-center justify-between px-4">
      <div className="text-xl font-mono font-bold">
        Blog Automation 
        </div>
        

        <div className="flex gap-5">
      {   pathnamePosts.includes(pathname) ? 
         (
            <>
                 <p onClick={() => router.push("/create-blog")} className='bg-blue-500 hover:bg-blue-600 px-6 hover:cursor-pointer rounded-md transition-all text-white font-bold'>Create Blog</p>

        <p onClick={() => router.push("/create-tracker-post")} className='bg-green-500 hover:bg-green-600 px-6 hover:cursor-pointer rounded-md transition-all text-white font-bold'>Create Daily Tracker</p>
        </>
         )
         :
         ( <>
           <p onClick={() => router.push("/all-post")} className='bg-blue-500 hover:bg-blue-600 px-6 hover:cursor-pointer rounded-md transition-all text-white font-bold'>View Blogs</p>

        <p onClick={() => router.push("/daily-tracker-post")} className='bg-green-500 hover:bg-green-600 px-6 hover:cursor-pointer rounded-md transition-all text-white font-bold'>View Daily Tracker</p>
         </>)}
        </div>
    </div>
  )
}

export default Navbar