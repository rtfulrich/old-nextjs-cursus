import React from 'react'

function Chapter({ chapter }) {

  // S T A T E S

  return (
    <div className="ml-4 px-4 my-2 flex justify-between items-center hover:bg-gray-900 bg-opacity-40 py-2 cursor-pointer rounded-lg">
      <h4 className="font-bold tracking-widest">
        <span className="w-12 text-center mr-2">{chapter.rank}</span> {chapter.title}
      </h4>
    </div>
  )
}

export default Chapter
