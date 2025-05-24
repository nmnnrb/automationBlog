import { Mic } from 'lucide-react'
import React from 'react'

const VoiceCommand = () => {
  return (
    <div className='fixed bottom-4 right-4 bg-violet-800 hover:bg-violet-900 p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer'>
            <Mic className='w-8 text-white  h-8' />
    </div>
  )
}

export default VoiceCommand