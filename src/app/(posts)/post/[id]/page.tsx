'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ArrowLeft, BookType, LoaderCircle, Pencil } from 'lucide-react';
import { useDisplayMode } from "@/hooks/DisplayModeProvider";

const Page = () => {
  const { id } = useParams();
  const router = useRouter();
  const { mode  , editAdmin} = useDisplayMode();

  const [data, setData] = useState({});
  const [summaryData, setSummaryData] = useState("");
  const [boolSummary, setBoolSummary] = useState(false);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_backend_URL}/post/${id}`);
      if (response.data.success) {
        const post = response.data.post;
        setData(post);
        setBoolSummary(post.summaryBool || false);
        setSummaryData(post.summaryData || ""); // ✅ correctly set summary content
        toast.success("Post fetched successfully");
      } else {
        toast.error("Post fetch failed");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      toast.error("Failed to fetch post");
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const generateSummary = async () => {
    try {
      setLoadingSummary(true);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_backend_URL}/gpt`, {
        message: `Please summarize the following post using simpler words. Format the summary in clean, readable HTML only. Use:

- Underlined section headings
- use different font size and color
- use bg white with rounded and shadow
- Bullet points or numbered lists
- Bold for key points
- No full HTML page structure (no <html>, <head>, or <body> tags)
- Keep it visually clean and optimized for mobile, tablet, and desktop readability

Only return the reformatted content snippet. Do not include scripts, styles, or page layout.

Original post: ${data.content}`,

      });
 
       console.log("GPT Response: response.data", response);

      if (!response.status === 200) {
        toast.error("Failed to generate summary");
        return;
      }

      const generated = response.data.response;


      const saveRes = await axios.put(`${process.env.NEXT_PUBLIC_API_backend_URL}/update-summary/${id}`, {
        summaryBool: true,
        summaryData: generated,
      });
      
      console.log("Save Response:", saveRes.data);
      if (saveRes.data.success) {
        setBoolSummary(true);
        setSummaryData(generated);
        toast.success("Summary generated and saved!");
      } else {
        toast.error("Failed to save summary");
      }

    } catch (err) {
      console.error("Error generating summary:", err);
      toast.error("Summary generation failed");
    } finally {
      setLoadingSummary(false);
    }
  };


  const editHandle = () => {
    router.push(`/edit-post/${id}`);
  }

  return (
    <div
      className={
        mode === "dark"
          ? "flex flex-col md:flex-row gap-4 md:gap-6 items-start justify-start w-full min-h-screen bg-zinc-900 py-3 px-1 sm:px-2"
          : "flex flex-col md:flex-row gap-4 md:gap-6 items-start justify-start w-full min-h-screen bg-gray-50 py-3 px-1 sm:px-2"
      }
    >
      {/* Left Panel */}
      <div
        className={
          mode === "dark"
            ? "w-full md:w-2/3 h-auto md:h-[calc(100vh-24px)] px-2 sm:px-4 py-3 bg-zinc-800 rounded-md shadow-lg flex flex-col gap-5 overflow-y-auto text-white"
            : "w-full md:w-2/3 h-auto md:h-[calc(100vh-24px)] px-2 sm:px-4 py-3 bg-gray-100 rounded-md shadow-lg flex flex-col gap-5 overflow-y-auto"
        }
      >
        <div>
          <div className="flex justify-start items-start w-full gap-2">
            <ArrowLeft
              onClick={() => router.push('/all-post')}
              className="w-5 hover:-translate-x-2 min-w-5 cursor-pointer transition"
            />
            <h1 className={mode === "dark"
            ? "mt-2 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold text-white"
            : "mt-2 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-semibold"}
          >
            {data.title}
          </h1>
    {editAdmin &&      <Pencil onClick={editHandle} className='w-8 hover:text-blue-600 transition duration-300 hover:cursor-pointer' />}
          </div>
          <p className={mode === "dark"
            ? "mt-3 text-xs sm:text-sm text-zinc-400"
            : "mt-3 text-xs sm:text-sm text-gray-500"}
          >
            {data.date && new Date(data.date).toLocaleDateString()}
            <span className={mode === "dark" ? "text-zinc-300 ml-2" : "text-gray-600 ml-2"}>{data.author}</span>
          </p>
          <div
            className={mode === "dark"
              ? "mt-4 text-base sm:text-lg prose prose-invert max-w-none break-words"
              : "mt-4 text-base sm:text-lg prose max-w-none break-words"}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>

      {/* Right Panel */}
      <div
        className={
          mode === "dark"
            ? "w-full md:w-1/3 h-auto md:h-[calc(100vh-24px)] px-2 sm:px-4 py-3 bg-zinc-800 rounded-md shadow-lg overflow-y-auto mt-4 md:mt-0 text-white"
            : "w-full md:w-1/3 h-auto md:h-[calc(100vh-24px)] px-2 sm:px-4 py-3 bg-gray-100 rounded-md shadow-lg overflow-y-auto mt-4 md:mt-0"
        }
      >
        <h1 className="flex justify-start items-end gap-2 font-semibold text-lg sm:text-xl md:text-2xl">
          <span className="mt-2">Summary</span>
          <span className={mode === "dark" ? "text-xs font-mono text-zinc-400" : "text-xs font-mono text-gray-500"}>AI-Generated</span>
        </h1>

        <div className={mode === "dark" ? "mt-4 w-full text-base sm:text-lg text-white" : "mt-4 w-full text-base sm:text-lg"}>
          {!boolSummary ? (
            loadingSummary ? (
              <p><LoaderCircle className="animate-spin" /></p>
            ) : (
              <button
                onClick={generateSummary}
                className={
                  mode === "dark"
                    ? "w-full text-base sm:text-lg md:text-xl font-mono flex flex-wrap justify-center items-center gap-2 font-semibold text-green-200 bg-green-900 hover:bg-green-800 transition-all rounded-lg px-4 sm:px-6 py-2"
                    : "w-full text-base sm:text-lg md:text-xl font-mono flex flex-wrap justify-center items-center gap-2 font-semibold text-green-700 bg-green-200 hover:bg-green-300 transition-all rounded-lg px-4 sm:px-6 py-2"
                }
              >
                <BookType className={mode === "dark" ? "w-5 h-5 text-green-200" : "w-5 h-5 text-green-900"} />
                Generate Summary
              </button>
            )
          ) : (
            <div
              className={mode === "dark"
                ? "prose prose-invert max-w-none break-words"
                : "prose max-w-none break-words"}
              dangerouslySetInnerHTML={{ __html: summaryData.slice(7, -3) }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
