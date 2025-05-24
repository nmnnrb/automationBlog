"use client";

import React from "react";
import RichTextEditor from "@/helper/RichTextEditor";

const TextEditor = ({editedContent, setEditedContent , publish}) => {
  // const [editedContent, setEditedContent] = React.useState<string>("");
  const [show, setShow] = React.useState(false);
  
  const preview = () => {
    setShow(!show);
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
 <div className="flex justify-between items-center mb-4">
         <h1 className="text-3xl font-bold mb-4 text-gray-800">Write your content</h1>
      <div className="flex space-x-4">
          <button onClick={preview} className="text-md hover:cursor-point hover:bg-green-800 transition duration-300 bg-green-700 px-6 py-1 text-white rounded-md shadow-lg font-bold mb-4 ">Preview</button>
        <button onClick={publish} className="text-md hover:cursor-point hover:bg-blue-800 transition duration-300 bg-blue-700 px-6 py-1 text-white rounded-md shadow-lg font-bold mb-4 ">Publish</button>
      </div>
 </div>
        <RichTextEditor content={editedContent} onChange={setEditedContent} />
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
