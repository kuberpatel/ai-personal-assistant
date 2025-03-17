import React from 'react'
import { Button } from '@/components/ui/button'
import AiAssistantsList from '@/services/Ai-AssistantsList';
import Image from 'next/image';

function AIAssistants() {
  return (
    <div className='px-10 mt-20 md:px-28 lg:px-36 xl-px-48'>
      <div className='flex justify-between items-center'>
        <div>
        <h2 className='text-3xl font-bold'>Welcome to the World of AI Assistants 🤖</h2>
        <p className='text-xl mt-2'>Choose your AI Companion to Simplify Your Tasks 🚀</p> 
        </div>
      <Button>Continue</Button>
    </div>

    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
      {AiAssistantsList.map((assistant, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="relative w-full aspect-square">
            <Image 
              src={assistant.image} 
              alt={assistant.title} 
              fill
              className='rounded-xl object-cover'
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />        
          </div>
          <h2 className='text-center font-bold text-lg mt-2'>{assistant.name}</h2>
          <h2 className='text-center text-gray-600 dark:text-gray-300'>{assistant.title}</h2>
        </div>
      ))}
    </div>
     </div>
  )
}

export default AIAssistants;
