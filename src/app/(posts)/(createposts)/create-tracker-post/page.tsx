"use client";
import TextEditor from "@/components/TextEditor";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDisplayMode } from "@/hooks/DisplayModeProvider";

const page = () => {
  const typeTitle = "Daily Activity";
  const boolDate = true;
  const [boolTitle, setBoolTitle] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [author, setAuthor] = useState("Naman");
  const boolTitleVar = true;
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [errorContent, setErrorContent] = useState(false);
  const [title, setTitle] = useState("");
  const { mode } = useDisplayMode();

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  useEffect(() => {
    if (date) {
      setErrorDate(false);
    }
    if (editedContent) {
      setErrorContent(false);
    }
  });

  const publish = async () => {
    if (!editedContent || !author || !date) {
      if (!editedContent) {
        setErrorContent(true);
      } else {
        setErrorContent(false);
      }
      if (!date) {
        setErrorDate(true);
      }
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_backend_URL}/create-tracker`,
        {
          title: title,
          content: editedContent,
          author: author, // Fix typo from 'authon'
          date: date,
        }
      );

      if (response.data.success) {
        await wait(500); // Optional: wait briefly to allow UI update
        setLoading(false); // First, update loading state
        window.location.reload(); // Then reload
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false); // Ensure loading is turned off even on error
      console.error("Error publishing tracker post:", error);
    }
  };

  return (
    <div
      className={`min-h-screen w-full flex justify-center items-start py-6 px-2 sm:px-4 transition-colors duration-300 ${
        mode === "light" ? "bg-gray-50 text-zinc-900" : "bg-zinc-900 text-white"
      }`}
    >
      <div
        className={`w-full max-w-2xl rounded-lg shadow-lg p-2 sm:p-6 transition-colors duration-300 ${
          mode === "light" ? "bg-white text-zinc-900" : "bg-zinc-800 text-white"
        }`}
      >
        <TextEditor
          errorDate={errorDate}
          errorContent={errorContent}
          loading={loading}
          typeTitle={typeTitle}
          boolTitleVar={boolTitleVar}
          setTitle={setTitle}
          title={title}
          setBoolTitle={setBoolTitle}
          boolTitle={boolTitle}
          date={date}
          boolDate={boolDate}
          editedContent={editedContent}
          setDate={setDate}
          setEditedContent={setEditedContent}
          publish={publish}
        />
      </div>
    </div>
  );
};

export default page;
