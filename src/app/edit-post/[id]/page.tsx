'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import TextEditor from '@/components/TextEditor';
import { useDisplayMode } from '@/hooks/DisplayModeProvider';
const Page = () => {
  const params = useParams();
  const id = params.id;
    const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(" ");
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('no authr');
  const [date, setDate] = useState('');

  // To control the title input visibility, matching TextEditor’s boolTitle prop
  const [boolTitle, setBoolTitle] = useState(false); 

  // For error states (if you want to extend)
  const [errorContent, setErrorContent] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
 
    const { mode , editAdmin } = useDisplayMode();

  let postContent = "";

  // Fetch post data by ID
  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_backend_URL}/post/${id}`);
      if (response.data.success) {
        const post = response.data.post;
        console.log('Fetched post:', post);
        setContent(post.content);
        postContent = post.content;
        setTitle(post.title || '');
        setAuthor(post.author || '');
        setDate(new Date().toLocaleString());
      } else {
        alert('Failed to fetch post: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('An error occurred fetching post data');
    } finally {
      setLoading(false);
    }
  };

  console.log('Post content:', postContent);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  // Update post data
  const handleUpdate = async () => {
    // Simple validation example:
    if (!content.trim()) {
      setErrorContent(true);
      return alert('Content cannot be empty');
    }
    if (!title.trim()) {
      setBoolTitle(true);
      return alert('Please enter a title');
    }

    try {
      setLoading(true);
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_backend_URL}/update-post/${id}`, {
        title,
        content,
        author,
        date,
      });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate a delay
      if (response.data.success) {
       router.push("/all-post")
      } else {
        alert('❌ Failed to update post: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('An error occurred while updating the post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`px-6 min-w-full h-full py-3 max-w-3xl mx-auto ${mode === 'light' ? "*:bg-white  text-zinc-900" : "bg-zinc-900 text-white"}`}>
   
      <TextEditor
        editedContent={content}
        initialContent={content}
        setEditedContent={setContent}
        title={title}
        setTitle={setTitle}
        updateButton={true}
        author={author}
        setAuthor={setAuthor}

        setDate={setDate}
        loading={loading}
        publish={handleUpdate}
        boolTitle={boolTitle}
        setBoolTitle={setBoolTitle}
        errorContent={errorContent}
        errorDate={errorDate}
        typeTitle="Post"
        boolTitleVar={boolTitle} 
        boolDate={false} // enable date input section
      />
    </div>
  );
};

export default Page;
