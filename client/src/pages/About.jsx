import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Header />
      <section className="text-xl max-[768px]:text-lg max-[640px]:text-base min-h-[85vh] p-5 mt-16 flex flex-col items-center">
        <h1 className="font-[500] text-3xl max-[640px]:text-2xl mb-3">
          About Us
        </h1>
        <p className='max-w-[800px] flex text-center'>
          At Litflix, we are more than just a software development firm, we are your partners in turning your vision into reality. With a passion for innovation and a commitment to excellence, we offer flexible and customized software development services to meet the unique needs of your business.
        </p>
      </section>
      <Footer />
    </>
  )
}
