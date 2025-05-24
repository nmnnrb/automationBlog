'use client'
import TextEditor from '@/components/TextEditor'
import React, { useState } from 'react'

const page = () => {
    const [editedContent, setEditedContent] = useState("")
    const publish = () => {
        console.log("print post" , editedContent)
    }
  return (
    <div>
              <TextEditor  editedContent={editedContent} setEditedContent={setEditedContent} publish={publish} />
    </div>
  )
}

export default page