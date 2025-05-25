'use client'
import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';

const page = () => {
      const params = useParams();
      const id = params.id;
      const [data,setData] = useState([]);
        const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_backend_URL}/post/${id}`)
            if (response.data.success) {
                console.log(response.data.post);
                setData(response.data.post);
            } else {
                toast.success("Post Failed to fetch");

            }
        } catch (error) {
            console.error("Error fetching post:", error);
            toast.error("Failed to fetch post");
        }
      }

      useEffect(() => {
        fetchData();
      })
      const router = useRouter();
      
  return (
<div>
    
      <div className="flex gap-5 items-start justify-start w-full h-screen bg-gray-50 py-5 px-2">


        {/* //left side */}
      <div className="w-2/3 h-screen px-6 py-3 bg-gray-100 rounded-md shadow-lg flex flex-col items-start justify-start gap-5 overflow-y-auto">
          
    {      <div>
<div className="flex justify-center items-start gap-2">
     <p onClick={() => router.push("/all-post")} ><ArrowLeft  className='w-5 hover:-translate-x-2 hover:cursor-pointer transition duration-300' /></p>
<h1 className='mt-2 md:text-5xl playwrite-hu-head font-semibold text-xl'> {data.title}</h1>
</div>
        <p className='mt-5 text-sm text-gray-500'>{new Date(data.date).toLocaleDateString()} <span className='text-gray-600 ml-2'>{data.author}</span></p>

      
    <div className="mt-5 text-2xl">
           
           <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data.content}}
        /> 
    </div>

        </div>


}


      </div>
 

        {/* right side */}
          
           <div className="flex  flex-col items-start justify-start w-1/3 h-screen px-6 py-3 bg-gray-100 rounded-md shadow-lg overflow-y-auto">
            <h1 className='mt-2 md:text-5xl playwrite-hu-head font-semibold text-xl'>Summary <span className='text-xs font-mono text-gray-500'>AI-Generate</span></h1>
           </div>
      </div>
    </div>

  )
}

export default page