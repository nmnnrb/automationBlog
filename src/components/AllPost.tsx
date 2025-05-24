'use client'
import React from 'react'
import dummy from '../dummy'
 const AllPost = () => {
    const [posts, setPosts] = React.useState(dummy);
    const darkColors = [
     "blue",
      "purple",
      "red",
      "orange",
];

const getRandomDarkColor = () => {
  const randomIndex = Math.floor(Math.random() * darkColors.length);
  return darkColors[randomIndex];
};


  return (
    <div>
            <div className='w-screen h-screen bg-gray-50 flex gap-5 items-center flex-wrap justify-start py-10 px-2'>
{
dummy.map((post) => {
const randomColor = getRandomDarkColor();
    return  (
        <div key={post.id} className="border px-6 hover:cursor-pointer w-[300px] h-[230px] py-2 shadow-xl rounded-lg hover:shadow-2xl flex flex-col justify-between mb-1"> 
      
       <div className="d">
             <p  className="text-sm  text-gray-500">Date: {post.date}</p>

          <h2 style={{color : randomColor}} className="text-xl font-bold">{post.title}</h2>
       </div>
        <div className="d">
              <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.split(' ').slice(0, 20).join(' ') }}
        />
        <p className='text-blue-800 font-semibold hover:text-blue-900 text-sm'>See More</p>
        </div>
          <p className="text-sm text-gray-500">Author: {post.author}</p>
        </div>
      )
})
}
    </div>
    </div>
  )
}

export default AllPost