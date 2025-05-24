'use client'
import { CirclePlus, Menu } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Navbar = () => {
    const pathnamePosts = ["/all-post", "/daily-tracker-post"]
    const router = useRouter();
      const pathname = usePathname()

      const [show ,setShow] = useState(false)
    const mobileTongle = () => {
        setShow(!show)
     
    }
return (
    <div className="w-full sticky h-12 shadow-md sm:h-16 bg-gradient-to-r from-violet-600 to-violet-800 text-white flex items-center justify-between px-2 sm:px-4">
      <div className="text-base playpen-sans-hebrew-title sm:text-xl  whitespace-nowrap">
      <p className='text-5xl'>  Blog Automation </p>
      </div>
      <div className="flex gap-2 sm:gap-5 items-center">
        {pathnamePosts.includes(pathname) ? 
          (
            <>
     <div className="d  md:flex gap-2 sm:gap-5 items-center hidden">
               <p 
            onClick={() => router.push("/create-blog")}
            className='flex hover:cursor-pointer gap-1 justify-start  items-center bg-blue-600 hover:bg-blue-700 font-black transition duration-300 px-3 py-[1px] rounded-xl'> <CirclePlus className='w-5 h-5' /> Post</p>

            <p 
              onClick={() => router.push("/create-tracker-post")}
            className='flex hover:cursor-pointer gap-1 justify-start  items-center bg-green-600 hover:bg-green-700 font-black transition duration-300 px-3 py-[1px] rounded-xl'> <CirclePlus className='w-5 h-5' /> Tracker</p>
     </div>
 
   
    

        <div className="md:hidden relative">
                <Menu onClick={mobileTongle} />
{show && (
  <div
    className={`absolute bg-gradient-to-b rounded-sm py-[3px] px-2 from-violet-300 to-violet-500 flex flex-col justify-start gap-2 sm:gap-5 items-start 
      top-full right-0 md:hidden 
      opacity-0 scale-95 -translate-y-2 
      animate-dropdown`}
  >
    <p
      onClick={() => router.push("/create-blog")}
      className="flex hover:cursor-pointer gap-1 justify-start items-center bg-blue-600 hover:bg-blue-700 font-black transition duration-300 px-3 py-[1px] rounded-xl"
    >
      <CirclePlus className="w-5 h-5" /> Post
    </p>
    <hr className="bg-black w-full" />
    <p
      onClick={() => router.push("/create-tracker-post")}
      className="flex hover:cursor-pointer gap-1 justify-start items-center bg-green-600 hover:bg-green-700 font-black transition duration-300 px-3 py-[1px] rounded-xl"
    >
      <CirclePlus className="w-5 h-5" /> Tracker
    </p>
  </div>
)}

        </div>
     
           
            
            </>
          )
          :
          (
            <>
              <p
                onClick={() => router.push("/all-post")}
                className='bg-blue-500 hover:bg-blue-600 px-2 sm:px-6 py-1 sm:py-2 rounded-md transition-all text-white font-bold text-xs sm:text-base cursor-pointer'
              >
                View Blogs
              </p>
              <p
                onClick={() => router.push("/daily-tracker-post")}
                className='bg-green-500 hover:bg-green-600 px-2 sm:px-6 py-1 sm:py-2 rounded-md transition-all text-white font-bold text-xs sm:text-base cursor-pointer'
              >
                View Daily Tracker
              </p>
            </>
          )}
      </div>
    </div>
  )
}

export default Navbar