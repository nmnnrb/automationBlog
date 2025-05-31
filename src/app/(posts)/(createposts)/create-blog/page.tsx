"use client";
import TextEditor from "@/components/TextEditor";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const typeTitle = "Blog";
  const [editedContent, setEditedContent] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("Naman");
  const boolTitle = true;
  const boolTitleVar = false;
  const boolDate = false;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // first commit
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const publish = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_backend_URL}/create-post`,
        {
          title: title,
          date: date,
          author: author,
          content: editedContent,
        }
      );
      if (response.data.success) {
        router.push("/all-post");
      } else {
        alert("Failed to publish post. Please try again.");
      }
      await wait(2000); 
      setLoading(false);
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };
  return (
    <div>
      <TextEditor
        loading={loading}
        boolTitleVar={boolTitleVar}
        typeTitle={typeTitle}
        boolDate={boolDate}
        setAuthor={setAuthor}
        author={author}
        date={date}
        title={title}
        boolTitle={boolTitle}
        editedContent={editedContent}
        setTitle={setTitle}
        setDate={setDate}
        setEditedContent={setEditedContent}
        publish={publish}
      />
    </div>
  );
};

export default page;
