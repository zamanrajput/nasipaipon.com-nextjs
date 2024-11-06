'use client'
import React from 'react'

const Page = () => {
  return (
    <div className='overflow-x-hidden'>
       <div className='w-screen backdrop-blur-sm text-white py-10 sm:pt-20 pt-28'>

<div className='text-5xl font-bold text-shadow-custom2 text-center my-10'>
  CONTACT US
</div>
<div className='flex sm:flex-row flex-col gap-14 justify-center my-16'>

  <div className="contact">

    <div className="form flex flex-col sm:items-start items-center gap-6 sm:w-[35vw] w-[100vw]">
      <div className='text-2xl'>
        Enter Your Details
      </div>
      <input className='formbg px-6 py-3 rounded-lg sm:w-[35vw] w-[90vw] placeholder-[rgba(000,000,000,0.6)]' type="text" placeholder='Name' />
      <input className='formbg px-6 py-3 rounded-lg sm:w-[35vw] w-[90vw] placeholder-[rgba(000,000,000,0.6)]' type="text" placeholder='Phone' />
      <input className='formbg px-6 py-3 rounded-lg sm:w-[35vw] w-[90vw] placeholder-[rgba(000,000,000,0.6)]' type="text" placeholder='Email' />
      <textarea className='formbg px-6 py-3 rounded-lg sm:w-[35vw] w-[90vw] placeholder-[rgba(000,000,000,0.6)]' name="message" rows={5} id="msg" placeholder='How can we serve you?'></textarea>
      <button className="btn my-8"> SEND
      </button>
    </div>

  </div>

  <div className="side sm:w-[35vw] w-[100vw] sm:text-start px-5 sm:px-0 text-center">
    <h1 className='text-2xl'>SPECIAL REQUEST</h1>
    <br />
    <p className='opacity-80'>{"Do you have dietary concerns? Questions about an upcoming event? Drop us a line, and we'll get back to you soon!"}</p>
    <br /><br />
    <h1 className='text-lg'>Nasi Paipon</h1>
    <br />
    <p>Address</p>
    <p className='opacity-80'>Queenslie Point, 120 Stepps Road, Glasgow, Lanarkshire, G33 3NQ</p>
    
    <br />
    
    <p className=''>Telephone</p>
    <a className='opacity-80' href='tel:+440141 611 2442'>0141 611 2442</a>
    <br/>
    <p className=''>Email</p>
    <a className='opacity-80' href="clearbusinessbyadrian@gmail.com">clearbusinessbyadrian@gmail.com</a>
    <br />
  </div>

</div>

</div>

<div className="footer cardbg text-white flex sm:flex-row flex-col w-screen items-center gap-2 sm:justify-around py-3 sm:text-base text-xs">
        <div className=' opacity-50'>{"Copyright © 2023 Queen's Bite - All Rights Reserved."}</div>
        <div className=' opacity-50'>Privacy Policy</div>
        <div className=' opacity-50'>Powered by Revolution Software Pakistan</div>
      </div>
    </div>
  )
}

export default Page
