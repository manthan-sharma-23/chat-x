import React from 'react'

function Home() {
  return (
    <div className="flexCenter h-full w-full flex-col text-gray-500 ">
      <div className="flexCenter h-[25vh] w-[25vh] text-[20vh]">
        <IoIosChatboxes />
      </div>
      <p className="font-mono text-2xl font-semibold">No chats Selected</p>
    </div>
  )
}

export default Home
