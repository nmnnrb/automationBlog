'use client'
import TextEditor from '@/components/TextEditor'
import React from 'react'
import { useState } from 'react'

const page = () => {
  const publish = () => {
    // Logic to publish the content
    console.log("Content published:", editedContent);
  }
  const [editedContent, setEditedContent] = useState("");
  return (
    <div>
      <TextEditor  editedContent={editedContent} setEditedContent={setEditedContent} publish={publish} />
    </div>
  )
}

export default page