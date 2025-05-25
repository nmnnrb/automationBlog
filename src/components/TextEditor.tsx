"use client";

import React, { useEffect, useState } from "react";
import RichTextEditor from "@/helper/RichTextEditor";
import { BookPlus, CircleX, Eye, LoaderCircle, Send } from "lucide-react";

const TextEditor = ({editedContent, typeTitle,loading , setBoolTitle , setAuthor="Naman", author, title, boolDate, boolTitle, setEditedContent , setDate ,setTitle, publish}) => {
  // const [editedContent, setEditedContent] = React.useState<string>("");
  const [show, setShow] = React.useState(false);
  const [showAuthor, setShowAuthor] = useState(false);
  const showAuthorPlace = () => {
    setShowAuthor(!showAuthor);
  }
  const preview = () => {
    setShow(!show);
  }

  const titleShow =() => {
    setBoolTitle(e => !e);
    setTitle("");
  }
  
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', options).format(date);
};


  //date
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
useEffect(() => {
  if (startDate && endDate) {
    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);
    setDate(`${formattedStart} - ${formattedEnd}`);
  }
}, [startDate, endDate]);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
 <div className="flex justify-between items-center mb-4">
         <h1 className="text-lg flex gap-1 font-bold justify-center items-center mb-4 text-gray-600">Write your <p className="font-bold text-gray-800 playpen-sans-hebrew-textT ">{typeTitle}</p></h1>
      <div className="flex space-x-4">
          <button onClick={preview} className="text-md hover:cursor-point hover:bg-green-800 transition duration-300 bg-green-700 px-3 py-1 text-white rounded-md shadow-lg font-bold mb-4 flex text-base gap-1 ">    <Eye className="w-5 hover:-translate-x-2 transition duration-300 " /> Preview</button>
       {
        !loading ? (
           <button onClick={publish} className="text-md hover:cursor-point hover:bg-blue-800 transition duration-300 bg-blue-700 px-3 py-1 text-white rounded-md shadow-lg font-bold mb-4 flex gap-1 text-base ">    <Send className="w-4 hover:-translate-x-2 transition duration-300 "/>Publish</button>
        ) : (
          <button className="text-md  hover:cursor-not-allowed transition duration-300 bg-zinc-500 px-3 py-1 text-white rounded-md shadow-lg font-bold mb-4  flex gap-1 text-base " ><LoaderCircle className="animate-spin" /></button>
        )
       }
      </div>
 </div>




  <div className="w-full relative">
  {boolTitle ? (  <CircleX onClick={titleShow} className="absolute hover:text-gray-600 transition duration-300 right-2 top-2" />) : (<p onClick={titleShow}  className="absolute bg-green-600  hover:cursor-pointer transition duration-300 hover:bg-green-700 text-white px-2 py-1 rounded-lg right-2">Add title</p>)}
    {boolTitle && <input type="text"
        placeholder="Title"
        className="w-full mb-4 p-2 border font-bold border-gray-300 rounded-md focus:outline-none "
        onChange={(e) => setTitle(e.target.value)}
        value={title}

      />}
  </div>


{  boolDate && (
     <div className="flex items-center justify-center gap-2 my-auto">
  <input
    type="date"
    placeholder="Title"
    className="w-1/5 mb-4 px-2 py-1 border text-xs border-gray-300 rounded-md focus:outline-none "
    onChange={(e) => setStartDate(e.target.value)}
  />
  
  <p className="font-bold my-auto text-center mb-5 text-xl">-</p>
  
  <input
    type="date"
    placeholder="Title"
    className="w-1/5 mb-4 px-2 py-1 border text-xs border-gray-300 rounded-md focus:outline-none"
    onChange={(e) => setEndDate(e.target.value)}
  />

</div>
  )}


        <RichTextEditor    content={editedContent}   onChange={setEditedContent} />
  
 <div className="flex relative gap-2 justify-start items-center mt-4 w-full">
   {showAuthor && (
    <input type="text"
      placeholder="Author Name"
      className="w-2/3 mb-4 px-2 py-1 border font-bold border-gray-300 rounded-md focus:outline-none "
      onChange={(e) => setAuthor(e.target.value)}
      value={author}
    />
  )}
       <div className="flex my-auto justify-end items-center mt-4">
         <p onClick={showAuthorPlace} className="flex absolute right-0 top-1/5 bg-cyan-500 px-2 py-1 hover:cursor-pointer rounded-md hover:bg-cyan-600 transition duration-300 justify-center items-start text-white  gap-1"><BookPlus className="text-cyan-40 w-4" /> Author</p>
       </div>
 </div>
      </div>

{show && (  
  <div className="w-screen h-screen bg-gray-900 bg-opacity-50 fixed top-0 left-0 flex items-center justify-center z-50">
    
    <div className="w-full max-w-2xl relative bg-white rounded-lg shadow p-6 max-h-[90vh] overflow-y-auto">
      <p
        onClick={preview}
        className="absolute top-0 right-0 bg-red-600 font-bold hover:bg-red-700 border-2 border-gray-100 text-white rounded-full px-2 py-1 cursor-pointer"
      >
        X
      </p>
      <h2 className="text-2xl border-b-2 font-semibold mb-2 text-gray-700">Preview</h2>
      <div
        className="prose min-h-[500px] max-w-none"
        dangerouslySetInnerHTML={{ __html: editedContent }}
      />
    </div>
  </div>
)}

    </div>
  );
};

export default TextEditor;
