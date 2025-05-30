"use client";
import TrackerSkills from "@/components/TrackerSkills";
import { DisplayModeProvider } from "@/hooks/DisplayModeProvider";
import axios from "axios";
import { LoaderCircle, SquarePlus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useDisplayMode } from "@/hooks/DisplayModeProvider";



const Page = () => {
  const [loading, setLoading] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null); // Selected skill object

  // Add skill handler
  const addHandle = async () => {
    setLoading(true);
    if (skillName.trim() === "") {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_backend_URL}/gpt`,
        {
          message: `is ${skillName} is any technical skill or programming skills that can be implemented on pc and run just give me one word answer yes/no give me in english`,
        }
      );

      console.log("GPT Response:", response.data.response);

      if (response.data.response.toLowerCase() === "no") {
        alert("This is not a valid skill");
        setLoading(false);
        return;
      }

      const skillsData = await axios.post(
        `${process.env.NEXT_PUBLIC_API_backend_URL}/gpt`,
        {
          message: `please give me a json object that has these field - skillName:  ${skillName} , basicQuestion: array of 10 questions for  ${skillName} , mediumQuestion: - array of 10 medium level question on  ${skillName}, hardQuestion- array of hard questions of  ${skillName} - just give me json object like const obj = {} `,
        }
      );

      console.log("Skills Data:", skillsData.data.response);
      const preObjectData = skillsData.data.response;

      const match = preObjectData.match(/```(?:json)?([\s\S]*?)```/);

      if (match && match[1]) {
        const extractedCode = match[1].trim();
        console.log("Extracted JSON-like code:", extractedCode);

        try {
          const objWrapper = new Function(`${extractedCode}; return obj;`);
          const parsedObj = objWrapper();
          console.log("Parsed Object:", parsedObj);

          // Save skill to backend
          const saveRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_backend_URL}/create-skill`,
            {
              skillName: parsedObj.skillName,
              basicQuestion: parsedObj.basicQuestion,
              mediumQuestion: parsedObj.mediumQuestion,
              hardQuestion: parsedObj.hardQuestion,
            }
          );

          if (saveRes.data.success) {
            setSkillName("");
            getAllSkills(); // Refresh skills list after adding new one
          }
        } catch (error) {
          console.error("Error parsing JSON:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No JSON code block found in response.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in addHandle:", error);
      setLoading(false);
    }
  };

  // Fetch all skills
  const getAllSkills = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_backend_URL}/get-all-skills`
      );
      setSkills(response.data.skills);
      if (response.data.skills.length > 0 && !selectedSkill) {
        setSelectedSkill(response.data.skills[0]); // Select first skill by default
      }
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    getAllSkills();
  }, []);

 const { mode, toggleMode, colorSchema } = useDisplayMode();

  return (
    <div className={`w-full min-h-screen flex flex-col md:flex-row gap-5 items-start justify-start px-2 md:px-6 py-2 md:py-3 transition-colors duration-300 ${mode === 'light' ? "bg-gray-100 text-zinc-900" : "bg-zinc-900 text-white"}`}>
      {/* Left sidebar */}
      <div className={`flex flex-row md:flex-col items-start justify-start w-full md:w-1/5 h-auto md:h-screen px-2 md:px-6 py-2 md:py-3 rounded-md shadow-lg overflow-x-auto md:overflow-y-auto transition-colors duration-300 ${mode === 'light' ? "bg-gray-50 text-zinc-900" : "bg-zinc-800 text-white"}`}>
        <div className="flex w-full gap-2 md:gap-4 relative">
          <input
            onChange={(e) => setSkillName(e.target.value)}
            value={skillName}
            type="search"
            placeholder="Search for skills..."
            className={`w-full h-[40px] p-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm transition-colors duration-300
              ${mode === 'light' ? "border-gray-300 bg-white text-zinc-900 placeholder-gray-400" : "border-zinc-700 bg-zinc-900 text-white placeholder-zinc-400"}
            `}
          />
          <button
            onClick={addHandle}
            className={`absolute right-2 top-2 text-2xl font-semibold transition duration-300 cursor-pointer
              ${mode === 'light' ? "hover:text-green-800 text-zinc-900" : "hover:text-green-400 text-white"}
            `}
            aria-label="Add skill"
          >
            <SquarePlus />
          </button>
        </div>

        {loading && (
          <button className={`px-4 py-2 rounded-md mt-2 ${mode === 'light' ? "text-blue-600" : "text-blue-400"}`}>
            <LoaderCircle className={`animate-spin ${mode === 'light' ? "text-green-800" : "text-green-400"} w-8 md:w-12`} />
          </button>
        )}

        {/* Skills list */}
        <div className="w-full mt-4 overflow-x-auto md:overflow-y-auto max-h-40 md:max-h-none">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={index}
                onClick={() => setSelectedSkill(skill)}
                className={`w-full flex flex-col items-start justify-start gap-2 px-2 md:px-4 py-2 rounded-md cursor-pointer transition duration-300
                  ${
                    selectedSkill?.skillName === skill.skillName
                      ? `font-semibold ${mode === 'light' ? "bg-white text-blue-700" : "bg-zinc-700 text-blue-400"}`
                      : `${mode === 'light' ? "hover:bg-gray-200" : "hover:bg-zinc-700"}`
                  }`}
              >
                <span className={`truncate text-xs md:text-base ${mode === 'light' ? "" : "text-white"}`}>
                  {skill.skillName.toUpperCase()}
                </span>
                <hr className={`min-w-full ${selectedSkill?.skillName === skill.skillName ? "border-blue-500" : (mode === 'light' ? "border-gray-200" : "border-zinc-700")} border`} />
              </div>
            ))
          ) : (
            <p className={`${mode === 'light' ? "text-gray-500" : "text-zinc-400"} mt-4 text-xs md:text-base`}>
              No skills found.
            </p>
          )}
        </div>
      </div>

      {/* Main content: TrackerSkills component */}
      <div className={`flex-grow w-full md:w-auto h-auto md:h-full overflow-auto mt-4 md:mt-0 transition-colors duration-300`}>
        {selectedSkill ? (
          <TrackerSkills skills={selectedSkill} />
        ) : (
          <p className={`${mode === 'light' ? "text-gray-500" : "text-zinc-400"} text-center md:text-left`}>
            Select a skill to see details.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
