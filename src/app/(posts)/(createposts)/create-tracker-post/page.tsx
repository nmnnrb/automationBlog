'use client'
import TextEditor from '@/components/TextEditor'
import React, { useState } from 'react'

const page = () => {
  const typeTitle = "Daily Activity"
  const boolDate = true;
  const [boolTitle ,setBoolTitle] = useState(true);
    const [editedContent, setEditedContent] = useState("");


    const publish = () => {

    }

  return (
    <div>
             <TextEditor typeTitle={typeTitle} setBoolTitle={setBoolTitle} boolTitle={boolTitle} boolDate={boolDate} editedContent={editedContent} setEditedContent={setEditedContent} publish={publish} />
    </div>
  )
}

export default page