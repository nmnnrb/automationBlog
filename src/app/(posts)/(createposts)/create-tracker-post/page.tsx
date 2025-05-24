'use client'
import TextEditor from '@/components/TextEditor'
import React, { useState } from 'react'

const page = () => {
    const [editedContent, setEditedContent] = useState("");
    const publish = () => {

    }

  return (
    <div>
             <TextEditor  editedContent={editedContent} setEditedContent={setEditedContent} publish={publish} />
    </div>
  )
}

export default page