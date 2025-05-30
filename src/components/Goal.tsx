import React from 'react'
import { useDisplayMode } from "@/hooks/DisplayModeProvider";

const Goal = () => {
  const { mode } = useDisplayMode();
  return (
    <div className={`flex flex-col items-center justify-center h-screen rounded-md transition-colors duration-300 ${mode === 'light' ? "bg-gray-50 text-zinc-900" : "bg-zinc-800 text-white"}`}>
      

    </div>
  )
}

export default Goal