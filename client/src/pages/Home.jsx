import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <section className="text-xl max-[768px]:text-lg max-[640px]:text-base min-h-[85vh] p-5 mt-16 flex flex-col">
        <div className='main'></div>
        <div className='gradient'></div>
        <h1 className="text-center font-[500] text-3xl max-[640px]:text-2xl mb-5">
          Welcome to Litflix: <br /> 
          <span className='font-[400] text-2xl'>Empowering Your Ideas through Innovative Software Solutions!</span>
        </h1>
        {/* <img src="https://mander.no/img/illustration.png" alt="innovation-thumbnail" className='self-center h-[500px]'/> */}
      </section>
      <Footer />
    </>
  )
}