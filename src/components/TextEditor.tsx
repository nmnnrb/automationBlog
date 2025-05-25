"use client";

import React, { useEffect, useState } from "react";
import RichTextEditor from "@/helper/RichTextEditor";
import { BookPlus, CirclePlus, CircleX, Eye, LoaderCircle, Send } from "lucide-react";

const TextEditor = ({
  editedContent,
  errorContent,
  boolTitleVar,
  errorDate,
  typeTitle,
  loading,
  setBoolTitle,
  setAuthor = "Naman",
  author,
  title,
  boolDate,
  boolTitle,
  setEditedContent,
  date,
  setDate,
  setTitle,
  publish,
}) => {
  const [show, setShow] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);

  const showAuthorPlace = () => setShowAuthor(!showAuthor);
  const preview = () => setShow(!show);

  const titleShow = () => {
    setBoolTitle((e) => !e);
    setTitle("");
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", options).format(date);
  };

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-6 px-2 sm:px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <h1 className="text-lg flex gap-1 font-bold text-gray-600">
            Write your{" "}
            <span className="font-bold text-gray-800 playpen-sans-hebrew-textT">
              {typeTitle}
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">

            <button
             onClick={preview}
              className="flex items-center justify-center gap-1 text-sm hover:bg-green-800 transition duration-300 bg-green-600 px-2 py-1 text-white rounded-md shadow-lg font-bold">

              <Eye className="w-4" /> {" "}Preview
            </button>
          

            {!loading ? (
              <button
                onClick={publish}
                className="text-md hover:bg-blue-800 transition duration-300 bg-blue-700 px-3 py-1 text-white rounded-md shadow-lg font-bold flex items-center justify-center gap-1"
              >
                <Send className="w-4 hover:-translate-x-2 transition duration-300" />{" "}
                Publish
              </button>
            ) : (
              <button className="text-md transition duration-300 bg-zinc-500 px-3 py-1 text-white rounded-md shadow-lg font-bold flex items-center justify-center gap-1 cursor-not-allowed">
                <LoaderCircle className="animate-spin" />
              </button>
            )}
          </div>
        </div>

        {/* Title Section */}
        <div className="w-full relative">
          {boolTitle ? (
            boolTitleVar && (
              <CircleX
                onClick={titleShow}
                className="absolute hover:text-gray-600 transition duration-300 right-2 top-2 cursor-pointer"
              />
            )
          ) : (
            <p
              onClick={titleShow}
              className="absolute bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded-lg right-2 top-2 cursor-pointer flex items-center gap-1 text-sm font-bold transition duration-300"
            >
                 <CirclePlus className="w-4" /> Title
            </p>
          )}
          {boolTitle ? (
            <input
              type="text"
              placeholder="Title"
              className="w-full mb-4 p-2 border font-bold border-gray-300 rounded-md focus:outline-none text-sm sm:text-base"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          ) : (<div className="w-full h-[50px]"> </div>)}
        </div>

        {/* Date Section */}
        {boolDate && (
          <div className="flex flex-col my-2 sm:flex-row justify-center items-center  w-full">
            <input
              type="date"
              style={{width: "30%"}}
              className="w-1/2 sm:w-1/2 mx-2 px-2 py-1 border text-xs border-gray-300 rounded-md focus:outline-none"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <p className="font-bold text-lg">-</p>
            <input
              type="date"
                style={{width: "30%"}}
              className="w-1/2 sm:w-1/2 px-2 mx-2 py-1 border text-xs border-gray-300 rounded-md focus:outline-none"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}
        {errorDate && (
          <p className="text-red-500 text-sm mt-1 mb-3">Date not entered</p>
        )}

        {/* Content Error */}
        {errorContent && (
          <p className="text-red-600 text-center my-4 text-lg font-bold">
            No content
          </p>
        )}

        {/* RichText Editor */}
        <RichTextEditor content={editedContent} onChange={setEditedContent} />

        {/* Author Section */}
        <div className="flex flex-col  gap-1 justify-between items-center mt-4 w-full ">
          {showAuthor && (
            <input
              type="text"
              placeholder="Author Name"
              className="w-full sm:w-2/3 mb-4 px-2 py-1 border font-bold border-gray-300 rounded-md focus:outline-none text-sm"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          )}

          <p
            onClick={showAuthorPlace}
            className={` sm:static ${showAuthor ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"}   px-2 py-1 cursor-pointer  rounded-md  transition duration-300 text-white flex items-center gap-1 text-sm`}
          >
            <BookPlus className="w-4" />
            {showAuthor ? "Hide Author" : "Add Author"}
          </p>
        </div>
      </div>

      {/* Preview Modal */}
      {show && (
        <div className="w-screen h-screen bg-gray-900 bg-opacity-50 fixed top-0 left-0 flex items-center justify-center z-50">
          <div className="w-full max-w-2xl relative bg-white rounded-lg shadow p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <p
              onClick={preview}
              className="absolute top-2 right-2 bg-red-600 font-bold hover:bg-red-700 text-white rounded-full px-3 py-1 cursor-pointer"
            >
              X
            </p>
            <h2 className="text-2xl border-b-2 font-semibold mb-2 text-gray-700">
              Preview
            </h2>
            <div
              className="prose min-h-[300px] max-w-none"
              dangerouslySetInnerHTML={{ __html: editedContent }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
