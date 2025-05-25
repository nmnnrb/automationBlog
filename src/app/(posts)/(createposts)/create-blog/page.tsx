'use client'
import TextEditor from '@/components/TextEditor'
import axios from 'axios'
import React, { useState } from 'react'




const page = () => {
    const [editedContent, setEditedContent] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [author, setAuthor] = useState("");
    const boolTitle = true;
    const boolDate = false;

    const [loading, setLoading] = useState(false);

    function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

    const publish = async () => {

    try {
      setLoading(true);
       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_backend_URL}/create-post` , {
      title: title, date: date, author: author, 
      content: editedContent
     });
     if (response.data.success) {
window.location.reload();
     }
    else {
       alert("Failed to publish post. Please try again.");
     }
      await wait(2000); // Simulate a delay of 2 seconds
      setLoading(false);
    } catch (error) {
      console.error("Error publishing post:", error);
    }
    }
  return (
    <div>
              <TextEditor loading={loading}  boolDate={boolDate} setAuthor={setAuthor} author={author} date={date} title={title} boolTitle={boolTitle} editedContent={editedContent} setTitle={setTitle} setDate={setDate} setEditedContent={setEditedContent} publish={publish} />
    </div>
  )
}

export default page