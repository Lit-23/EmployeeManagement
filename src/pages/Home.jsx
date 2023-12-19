import React from 'react'

export default function Home() {
  return (
    <section className="text-xl max-[768px]:text-lg max-[640px]:text-base min-h-[80vh] p-5 mt-16 flex flex-col">
      <h1 className="self-center font-semibold text-3xl max-[640px]:text-2xl mb-2">
        Welcome to Litflix - Empowering Your Ideas through Innovative Software Solutions!
      </h1>
      <img src="https://mander.no/img/illustration.png" alt="innovation-thumbnail" className='self-center h-[500px] p-3 rounded-lg shadow-lg'/>
    </section>
  )
}