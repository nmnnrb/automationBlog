'use client'
import TextEditor from '@/components/TextEditor'
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");      
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('no author');
  const [date, setDate] = useState('');

  const [boolTitle, setBoolTitle] = useState(false);

  const [errorContent, setErrorContent] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  
  

  // Fetch existing post data on mount
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_backend_URL}/tracker-post/${id}`);
        const post = response.data.post;
        console.log("Content Data:", post);

        // Set states from fetched post
        setContent(post.content || "");
        setTitle(post.title || "");

        setAuthor(post.author || "no author");
        setDate(post.date);
        console.log("dtatetetet", post.date);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post data:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchContent();
    }
  }, [id]);

  const update = async () => {
    try {
      setLoading(true);
      // Put request to update the tracker post
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_backend_URL}/update-tracker-post/${id}`, {
        id,
        title,
        content,
        date,
      });
      console.log("Response from update:", response.data);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay
      setLoading(false);
      router.push("/daily-tracker-post");
    } catch (error) {
      console.error("Error updating tracker post:", error);
      setLoading(false);
    }
  };


 return (
  <div>

      <TextEditor
        editedContent={content}
        initialContent={content}
        setEditedContent={setContent}
        title={title}
        setTitle={setTitle}
        updateButton={true}
        author={author}
        date={date}
        setDate={setDate}
        loading={loading}
        publish={update}
        boolTitle={boolTitle}
        setBoolTitle={setBoolTitle}
        errorContent={errorContent}
        errorDate={errorDate}
        typeTitle="Activity Tracker"
        boolTitleVar={boolTitle}
        boolDate={true} 
      />
  </div>
);

};

export default Page;
