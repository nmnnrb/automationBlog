'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import dummy from '../dummy'
 const AllPost = () => {

  const [dummy, setDummy] =  useState([]);

  const fetchPost = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_backend_URL}/get-all-posts`);

      console.log(response);
      if(response.data.success) {
        setDummy(response.data.post);
      }else
      {
        console.error("Failed to fetch posts");
      }
  }

  useEffect(() => {
    fetchPost();
  }, [])



    const darkColors = [
   "blue",
   "red",
   "green",
   "purple",
    "brown",
];


  function getRandomLightColor() {
    let r = Math.floor(Math.random() * 56) + 200; // 200-255 (Light shade)
    let g = Math.floor(Math.random() * 56) + 200; // 200-255 (Light shade)
    let b = Math.floor(Math.random() * 56) + 200; // 200-255 (Light shade)
    
    return `rgb(${r}, ${g}, ${b})`;
}

const getRandomDarkColor = () => {
  const randomIndex = Math.floor(Math.random() * darkColors.length);
  return darkColors[randomIndex];
};
 
const router = useRouter();

  return (
    <div>
      <div className="w-full min-h-screen bg-gray-50 flex flex-wrap justify-center items-start gap-4 py-8 px-2 sm:px-4 md:px-8">
        {
          dummy.map((post, index) => {
            const randomColor = getRandomDarkColor();
            return (
              <div
                style={{ backgroundColor: getRandomLightColor() }}
                key={index}
                className="border relative px-4 sm:px-6 hover:cursor-pointer w-full xs:w-[90%] sm:w-[350px] md:w-[300px] h-[230px] sm:h-[250px] overflow-hidden py-2 shadow-xl rounded-lg hover:shadow-2xl flex flex-col justify-start gap-3 sm:gap-4 mb-2 transition-all duration-200"
              >
                <div className="flex flex-col gap-0 mb-1">
                  <p className="text-[10px] text-gray-500">Date: {new Date(post.date).toLocaleDateString()}</p>
                  <h2
                    style={{ color: randomColor }}
                    className="text-base sm:text-lg md:text-2xl font-bold truncate"
                  >
                    {post.title}
                  </h2>
                </div>
                <div>
                  <div
                    className="prose max-w-none text-xs sm:text-sm"
                    dangerouslySetInnerHTML={{ __html: post.content.split(' ').slice(0, 20).join(' ') }}
                  />
                </div>
                <div className="absolute h-[48px] sm:h-[50px] w-full shadow-2xl overflow-hidden px-4 sm:px-6 pt-2 bg-gray-100 bottom-0 left-0 flex flex-col justify-center">
                  <p
                    onClick={() => router.push(`/post/${post._id}`)}
                    className="text-blue-800 font-semibold hover:text-blue-900 text-xs sm:text-sm cursor-pointer"
                  >
                    See More
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">Author: {post.author}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AllPost