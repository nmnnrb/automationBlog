"use client";
import axios from "axios";
import { ChevronDown, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDisplayMode } from "@/hooks/DisplayModeProvider";

const TrackerSkills = ({ skills }) => {
  const [showBasic, setShowBasic] = useState(false);
  const [showMedium, setShowMedium] = useState(false);
  const [showHard, setShowHard] = useState(false);

  const [checkedBasic, setCheckedBasic] = useState([]);
  const [checkedMedium, setCheckedMedium] = useState([]);
  const [checkedHard, setCheckedHard] = useState([]);

  useEffect(() => {
    setCheckedBasic(
      skills.checkedBasicQuestions?.length === skills.basicQuestion.length
        ? skills.checkedBasicQuestions
        : new Array(skills.basicQuestion.length).fill(false)
    );
    setCheckedMedium(
      skills.checkedMediumQuestions?.length === skills.mediumQuestion.length
        ? skills.checkedMediumQuestions
        : new Array(skills.mediumQuestion.length).fill(false)
    );
    setCheckedHard(
      skills.checkedHardQuestions?.length === skills.hardQuestion.length
        ? skills.checkedHardQuestions
        : new Array(skills.hardQuestion.length).fill(false)
    );
  }, [skills]);

  const toggleCheckbox = async (type, index, checked) => {
    const stateMap = {
      basic: [checkedBasic, setCheckedBasic, skills.basicQuestion.length],
      medium: [checkedMedium, setCheckedMedium, skills.mediumQuestion.length],
      hard: [checkedHard, setCheckedHard, skills.hardQuestion.length],
    };

    const [currentState, setState, maxLength] = stateMap[type];
    const updated = [...currentState];
    updated[index] = checked;
    setState(updated);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_backend_URL}/check-box`,
        {
          skillName: skills.skillName,
          questionType: type,
          questionIndex: index,
          checked,
        }
      );

      if (response.data.checkedArray?.length === maxLength) {
        setState(response.data.checkedArray);
      }

          await pointsData();
    } catch (error) {
      console.error("Error updating checkbox:", error);
      alert("Failed to update. Please try again.");
      // Rollback
      const rollback = [...currentState];
      rollback[index] = !checked;
      setState(rollback);
    }
  };

  const renderQuestions = (type, questions, checkedState, toggleFunc) =>
    questions.map((question, index) => (
      <div key={index} className="text-gray-700">
        <label className="text-sm sm:text-base leading-relaxed flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-1"
            checked={checkedState[index] || false}
            onChange={(e) => toggleFunc(type, index, e.target.checked)}
          />
          <span>{question}</span>
        </label>
      </div>
    ));
 
    const [points, setPoints] = useState(0);
    const pointsData = async () => {
      const points = await axios.get(
        `${process.env.NEXT_PUBLIC_API_backend_URL}/score/${skills.skillName}`)
setPoints(points.data.score);
        console.log(points.data);
    }

useEffect(() => {
  if (skills?.skillName) {
    pointsData();
  }
}, [skills.skillName]);



const [loading, setLoading] = useState(false);
const [suggestions, setSuggestions] = useState("");

const callSuggestions = async () => {
  setLoading(true);
  setSuggestions("");
   try {
     
     const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_backend_URL}/gpt`,
            {
              message: `Please provide 5 suggestions for improving the skill "${skills.skillName}". Format the suggestions as a numbered list with each suggestion on a new line. Use simple, clear language suitable for beginners.
              
              -give me formated in clean, readable HTML only.
              -give me like 7-8 points  of suggestions
              -Use bullet points or numbered lists
              -Use bold for key points
              -No full HTML page structure (no <html>, <head>, or <body> tags)
              -Keep it visually clean and optimized for mobile, tablet, and desktop readability
              -on the last two points , give me the practical succestion (like any project 1 is for begginer and 1 is little complex that will be helpful for the  learner and get the handon practice these project (simple and hard ) should be in bold and on high fontsize then other)
              `,
              
              
  
            }
          );
const match = response.data.response.match(/```([\s\S]*?)```/);
const content = match ? match[1].trim().slice(4) : null;
      setSuggestions(content);
      setLoading(false);
   } catch (error) {
      console.error("Error fetching suggestions:", error);
   }finally {
    setLoading(false);
   }
}

useEffect(() => {
callSuggestions();
},[skills.skillName]);

  const { mode, toggleMode, colorSchema } = useDisplayMode();


  return (
    <div className={`flex flex-col gap-6 px-4 py-4 rounded-md shadow-lg overflow-y-auto w-full max-w-3xl mx-auto min-h-screen ${mode === 'light' ? "bg-gray-100 text-zinc-900" : "bg-zinc-900 text-white"}`}>
      <div className={`w-full relative flex flex-col gap-6 p-4 sm:p-6 ${mode === 'light' ? "" : ""}`}>
        {/* Header and Progress Bar */}
        <div className={`flex fixed left-[40%] flex-col px-4 py-6 rounded-md shadow-lg sm:flex-row items-center justify-between gap-4 
           ${mode === 'light' ? "bg-gray-100 text-zinc-900" : "bg-zinc-800 text-white"} mb-4`}>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center sm:text-left w-full sm:w-auto">
            {skills.skillName.toUpperCase()}
          </h1>
          <div className="relative w-full sm:w-[400px] h-8 flex items-center">
            {/* Progress Bar Track */}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-3 rounded-full ${mode === 'light' ? "bg-gray-200" : "bg-zinc-700"}`} />
            {/* Progress Bar Fill */}
            <div
              style={{ width: `${Math.min(points, 100)}%` }}
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-3 rounded-full transition-all duration-500 ${
                points > 50
                  ? "bg-green-500"
                  : points > 36
                  ? "bg-yellow-600"
                  : "bg-red-600"
              }`}
            />
            {/* Big Dot */}
            <div
              style={{
                left: `calc(${Math.min(points, 100)}% - 0.75rem)`,
              }}
              className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow ${
                points > 50
                  ? "bg-green-500"
                  : points > 36
                  ? "bg-yellow-600"
                  : "bg-red-600"
              } transition-all duration-500`}
            />
            {/* Percentage Label */}
            <span
              style={{
                left: `calc(${Math.min(points, 100)}% - 1.5rem)`,
              }}
              className={`absolute -top-8 px-3 py-1 rounded-full text-xs font-semibold text-white shadow ${
                points > 50
                  ? "bg-green-500"
                  : points > 36
                  ? "bg-yellow-600"
                  : "bg-red-600"
              } transition-all duration-500`}
            >
              {points}%
            </span>
          </div>
        </div>

        <div className="h-[80px]"></div>
        {/* BASIC */}
        <Section
          title="BASIC QUESTIONS"
          show={showBasic}
          toggle={() => setShowBasic(!showBasic)}
          content={
            showBasic &&
            (skills.basicQuestion?.length > 0 ? (
              renderQuestions("basic", skills.basicQuestion, checkedBasic, toggleCheckbox)
            ) : (
              <p className={`${mode === 'light' ? "text-gray-500" : "text-zinc-400"} text-sm`}>No questions available.</p>
            ))
          }
          mode={mode}
        />
        {/* MEDIUM */}
        <Section
          title="MEDIUM QUESTIONS"
          show={showMedium}
          toggle={() => setShowMedium(!showMedium)}
          content={
            showMedium &&
            (skills.mediumQuestion?.length > 0 ? (
              renderQuestions("medium", skills.mediumQuestion, checkedMedium, toggleCheckbox)
            ) : (
              <p className={`${mode === 'light' ? "text-gray-500" : "text-zinc-400"} text-sm`}>No questions available.</p>
            ))
          }
          mode={mode}
        />
        {/* HARD */}
        <Section
          title="HARD QUESTIONS"
          show={showHard}
          toggle={() => setShowHard(!showHard)}
          content={
            showHard &&
            (skills.hardQuestion?.length > 0 ? (
              renderQuestions("hard", skills.hardQuestion, checkedHard, toggleCheckbox)
            ) : (
              <p className={`${mode === 'light' ? "text-gray-500" : "text-zinc-400"} text-sm`}>No questions available.</p>
            ))
          }
          mode={mode}
        />

        {
          loading ? (
            <p><LoaderCircle className="animate-spin w-23" /></p>
          ) : (
            <div className={`${mode === 'light' ? "bg-white text-zinc-900" : "bg-zinc-800 text-white"} px-6 py-3 rounded-tr-xl shadow-md mt-4 rounded-bl-xl`}>
              <h1 className={`mb-4 md:text-4xl text-xl font-semibold italic ${mode === 'light' ? "text-blue-700" : "text-blue-400"}`}>Suggestions ...</h1>
              <div
                className="prose max-w-none text-xs sm:text-sm"
                dangerouslySetInnerHTML={{ __html: suggestions }}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

// Update Section to accept mode prop and sync bg/text color
const Section = ({ title, show, toggle, content, mode }) => (
  <section className={`flex flex-col w-full rounded-lg shadow-md justify-start items-start p-4 sm:p-6 ${mode === 'light' ? "bg-white text-zinc-900" : "bg-zinc-800 text-white"}`}>
    <button
      type="button"
      onClick={toggle}
      className="flex justify-between w-full items-center cursor-pointer focus:outline-none"
      aria-expanded={show}
    >
      <p className={`font-semibold ${mode === 'light' ? "text-gray-900" : "text-white"} text-base sm:text-lg`}>{title}</p>
      <ChevronDown
        className={`transition-transform duration-300 ${mode === 'light' ? "text-gray-700" : "text-zinc-300"} ${show ? "rotate-180" : ""}`}
        size={24}
      />
    </button>
    <div
      className={`flex flex-col gap-3 mt-3 overflow-hidden transition-all duration-700 ease-in-out`}
      style={{
        maxHeight: show ? "600px" : "0",
        paddingTop: show ? "0.75rem" : "0",
        paddingBottom: show ? "0.75rem" : "0",
      }}
    >
      {content}
    </div>
  </section>
);

export default TrackerSkills;
