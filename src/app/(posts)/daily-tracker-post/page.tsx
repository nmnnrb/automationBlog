'use client'
import React, { useEffect, useState } from 'react'
import Goal from "@/components/Goal"
import axios from 'axios'
import { useDisplayMode } from "@/hooks/DisplayModeProvider";
import { Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';


const page = () => {
const darkColors = [
     "blue",
      "purple",
      "red",
      "orange",
      "violet" ,
      "indigo",
      "darkgreen",
      "brown",
      "maroon",
      "navy",
      "teal",
      "darkslategray",
      "darkorchid",
      "darkred",
      "darkblue",
];


 
  const router = useRouter();


const getRandomDarkColor = () => {
  const randomIndex = Math.floor(Math.random() * darkColors.length);
  return darkColors[randomIndex];
};


  const [trackerPost, setTrackerPost] = useState([]);
const fetchPost = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_backend_URL}/get-tracker-post`);
    if(response.data.success) {
      console.log("response data" , response.data.post);
      setTrackerPost(response.data.post);
    } else {
      console.error("Failed to fetch tracker posts");
    }
}

useEffect(() => {
  fetchPost();
},[])

const { mode , editAdmin } = useDisplayMode();

  return (
    <div className={`flex flex-col lg:flex-row justify-start items-start pt-12  w-full px-2 lg:px-5 gap-4 lg:gap-8 transition-colors duration-300 ${mode === 'light' ? "bg-gray-50 text-zinc-900" : "bg-zinc-900 text-white"}`}>
      <div className="w-full lg:w-[70%]">
        {trackerPost.reverse().map((post, index) => {
          const randomColor = getRandomDarkColor();
          return (
            <div key={index} className="mb-8">
              <div className={`border border-l-4 border-t border-t-green-500 border-l-green-400 border-r-green-400 px-4 lg:px-6 py-3 ${mode === 'light' ? "bg-white" : "bg-zinc-800"}`}>
               <div className="flex justify-start items-start gap-2">
                 <p
                  style={{ color: randomColor }}
                  className="playwrite-dk-loopet-head-date text-2xl  lg:text-3xl"
                >{post.date}</p>

                {editAdmin &&   <Pencil onClick={() => {
                  return (
                    router.push(`/edit-tracker/${post._id}`)
                  )
                }} className='w-3 hover:cursor-pointer hover:text-blue-600 transition duration-300' />}
               </div>
                <hr className={`mt-3 h-[2px] w-[35%] ${mode === 'light' ? "bg-gray-50" : "bg-zinc-700"}`} />
                {/* title */}
                {post.title && (
                  <p className="text-2xl lg:text-4xl mt-4 pacifico-regular font-bold">{post.title}</p>
                )}
                <div
                  className="prose my-5 max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="w-full lg:w-[30%]">
        <Goal />
      </div>
    </div>
  )
}

export default page