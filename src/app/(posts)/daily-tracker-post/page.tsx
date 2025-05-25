'use client'
import React, { useEffect, useState } from 'react'

import Goal from "@/components/Goal"
import axios from 'axios'


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


  return (
    <div className="flex flex-col lg:flex-row justify-start items-start mt-12 w-full px-2 lg:px-5 gap-4 lg:gap-8">
      <div className="w-full lg:w-[70%]">
        {trackerPost.map((post, index) =>
       {
const randomColor = getRandomDarkColor();

        return   (
          <div key={index} className="mb-8">
            <div className="border border-l-4 border-t border-t-green-500 border-l-green-400 border-r-green-400 px-4 lg:px-6 py-3">
              <p
              style={{ color: randomColor }}
              className={`playwrite-dk-loopet-head-date text-2xl  lg:text-3xl  `}>{post.date}</p>
              <hr className='mt-3 h-[2px] w-[35%] bg-gray-50' />
              {/* title */}
              {post.title && <p className='text-2xl lg:text-4xl mt-4 pacifico-regular font-bold'>{post.title}</p>}
              <div
                className="prose my-5 max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        )
       }
      )
        }
      </div>
      <div className="w-full lg:w-[30%]">
      <Goal />
      </div>
    </div>
  )
}

export default page