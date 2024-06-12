import React from 'react'

function Loader() {
  return (
    <div className='flex flex-col items-center gap-1 justify-center'>
      <h3 className='text-center mt-10'>Loading</h3>
      <div className='w-8 h-8 rounded-full border-2 border-bg-[rgba(0,0,0,0,0.5)] border-b-teal-400 animate-spin'></div>
    </div>
  )
}

export default Loader