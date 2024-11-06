import logo from "../../../../assets/assets/logo (3).png";
import React from 'react'
import Image from 'next/image'
import aboutImg from '../../../../assets/assets/louis-hansel-1keEJmqm8vU-unsplash.jpg'


const Page = () => {
  return (
    <div className='overflow-x-hidden'>
       <div className="about flex justify-center gap-6 items-center mt-16 sm:h-screen w-screen py-10 backdrop-blur-sm text-white">
        <div className='sm:w-[40vw] w-[90vw] sm:text-start text-start'>
          <h1 className='text-5xl font-bold'>
            ABOUT <span className='aboutclr'> US</span> <br />
          </h1>
         
       
          <br />


          <h1 className='text-2xl mt-4 aboutclr font-bold'><span className="text-red-500">Nasi</span><span> Paipon</span></h1>
            <br />
            <p className=''>Address</p>
            <p className='opacity-80'>Jalan 5/4C Desa Melawati Kuala Lumpur, 53100 Kuala Lumpur</p>
            <p className='opacity-80'>{"NO 6 JALAN WAWASAN CAMPURAN, BANDAR BARU AMPANG, 68000 AMPANG, SELANGOR"}</p>
            
            <br />
            
            <p className=''>Telephone</p>
            <a className='opacity-80' href='tel:+440141 611 2442'>0141 611 2442</a>
            
            <p className='mt-4'>Email</p>
            <a className='opacity-80' href="clearbusinessbyadrian@gmail.com">clearbusinessbyadrian@gmail.com</a>
            
        </div>

        <div className='sm:block hidden w-[40vw]'>
          <Image className='rounded-lg' width={650} src={aboutImg} alt='aboutImg' />
        </div>

      </div>

      <div className="sm:px-60 px-5 m-auto pb-20 backdrop-blur-md text-gray-300">
        <div className="py-16">
          <Image src={logo} alt="logo" className="m-auto w-56 rounded-md drop-shadow-2xl" />
        </div>
        <div className="text-center text-5xl font-bold mb-20 text-white">About Nasi Paipon</div>
        <div className="doc">
          {
            "Nasi Paipon is the ultimate food ordering platform designed for those who need to place bulk orders from trusted Nasi Paipon vendors. Whether it’s a wedding, birthday, office party, mosque gathering, or any special event, Nasi Paipon is here to make catering easier than ever."
          }
          <h1 className="text-xl mt-5 mb-2 font-bold text-white">Why Choose Nasi Paipon?</h1>
          {
            "With Nasi Paipon, you can effortlessly order food in large quantities from a diverse range of vendors – including restaurants, caterers, food stalls, and even home-based food providers. "
          }
          <h1 className="text-xl mt-5 mb-2 font-bold text-white">Effortless Pickup with QR Code</h1>
          {
            "Although Nasi Paipon doesn’t directly offer delivery services, we make pickups a breeze. After you place an order, you’ll receive a QR code that you can show to the vendor. Once the vendor scans your QR code, they can easily view the details of your order, ensuring a quick and accurate handover. You can choose to pick up the food yourself or arrange a delivery service to collect it."
          }
          <h1 className="text-xl mt-5 mb-2 font-bold text-white">Unmatched Convenience for Big Events</h1>
          {
            "There’s no platform like Nasi Paipon in the market today for placing bulk food orders. Now you can streamline your food ordering process for large events with a few taps."
          }
          <h1 className="text-xl mt-5 mb-2 font-bold text-white">{"Perfect for:"}</h1>
         <b> Anyone planning a large gathering:</b> weddings, birthdays, prayer
          gatherings, office meals, and more. <br /> <b>Event organizers</b> who need a
          reliable source for food in large quantities. <br />{"Experience the convenience of bulk food ordering with Nasi Paipon – simplifying catering for your special events!"}
        </div>
      </div>

      <div className="footer cardbg text-white flex sm:flex-row flex-col items-center w-screen justify-around py-3 sm:mt-72 mt-24">
        <div className=' opacity-50'>{"Copyright © 2023 Nasi Paipon - All Rights Reserved."}</div>
        <div className=' opacity-50'>Privacy Policy</div>
        <div className=' opacity-50'>Powered by Revolution Software Pakistan</div>
      </div>

    </div>
  )
}

export default Page
