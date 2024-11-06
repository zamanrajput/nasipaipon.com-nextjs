"use client";
import React from "react";
import { BiSolidStar } from "react-icons/bi";
import Image from "next/image";
import sideImg from "../../assets/assets/9ac5e554-c903-41f7-b3ba-efe4af172bf2.jpeg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import aboutImg from "../../assets/assets/louis-hansel-1keEJmqm8vU-unsplash.jpg";
import { FaGoogle } from "react-icons/fa";
import logo from "../../assets/assets/icon.png";
import { useRouter } from "next/navigation";

const Page = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const router = useRouter();
  return (
    <div className=" flex flex-col items-center w-full justify-center overflow-x-hidden  ">
      <div className="sm:w-[100vw] w-[90vw] h-[95vh] flex sm:mt-20 sm:items-center justify-center">
        <div className="text-pretty flex flex-col items-center sm:w-[60vw] w-[90vw] rounded-xl p-5">
          <div className="relative sm:text-3xl text-3xl text-white">
           
            <h1 className="aboutclr mt-16 sm:text-6xl text-4xl font-bold">
              <img width={400} src={logo.src} alt="" />
            </h1>
          </div>
          <div className="sm:text-2xl text-xl text-gray-200 text-center mb-7">
          Welcome to Nasi Paipon! Your Go-To Food Ordering App for Large Gatherings
          </div>
          <div className="sm:text-2xl text-xl text-gray-100 text-center">
            {
              "Nasi Paipon is the ultimate food ordering platform designed for those who need to place bulk orders from trusted Nasi Paipon vendors. Whether it’s a wedding, birthday, office party, mosque gathering, or any special event, Nasi Paipon is here to make catering easier than ever."
            }
          </div>

          <button className="aboutbtn sm:mt-5 mt-6 w-[20vw]">CONTACT US</button>
        </div>


      </div>

      <div className="rev  flex flex-col w-screen sm:mt-28">
        <div className=" flex  flex-col text-white items-center gap-12 sm:my-12">
          <h1 className="sm:text-6xl sm:font-bold text-3xl font-semibold">
            REVIEWS
          </h1>
          <div className="flex sm:gap-10 gap-4 items-center">
            <FaGoogle
              onClick={() => {
                window.open("https://www.maps.google.com", "_blank");
              }}
              size={30}
              className="p-2 rounded-full locat bg-white text-black shadow-xl cursor-pointer hover:bg-white hover:text-black"
            />

            <span className="review sm:text-8xl text-4xl sm:font-bold font-semibold">
              4.1
            </span>
            <span className="text-xl flex flex-col gap-2">
              <span className="sm:text-4xl text-3xl sm:font-bold font-semibold">
                Nasi Paipon
              </span>
              <span className="flex sm:text-[30px] text-[20px] mt-2">
                <BiSolidStar color="orange" />
                <BiSolidStar color="orange" />
                <BiSolidStar color="orange" />
                <BiSolidStar color="orange" />
                <BiSolidStar color="orange" />
              </span>
              <span className="text-xl ms-1">445 Reviews</span>
            </span>
          </div>
        </div>

        <Carousel
          responsive={responsive}
          className="sm:mx-10 mx-12 sm:mt-0 mt-16 z-10"
          autoPlay={true}
          infinite={true}
          autoPlaySpeed={2000}
        >
          <div className="card flex flex-col gap-6 items-center py-10">
            <div className="flex flex-col gap-4">
              <div className="circle h-28 w-28 bg-pink-500 flex items-center justify-center text-5xl font-bold">
                D
              </div>

              <div className="stars flex text-xl">
                <BiSolidStar className="" color="yellow" />
                <BiSolidStar className="" color="yellow" />
                <BiSolidStar className="" color="yellow" />
                <BiSolidStar className="" color="yellow" />
                <BiSolidStar className="" color="rgba(255,255,255,0.7)" />
              </div>
            </div>
            <div className="text-centre my-6 px-6">
              This customer did not write a review.
            </div>
            <div className="name mt-6">
              <b>Darren Smith</b> -14/09/2014
            </div>
          </div>

          <div className="card  flex flex-col gap-6 items-center py-10">
            <div className="circle h-28 w-28 bg-pink-500 flex items-center justify-center text-5xl font-bold">
              A
            </div>

            <div className="stars flex text-xl">
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="rgba(255,255,255,0.7)" />
            </div>
            <div className="text-centre my-6 px-6">
              This customer did not write a review.
            </div>
            <div className="name mt-6">
              <b>Alison Door Bell</b> -24/09/2004
            </div>
          </div>

          <div className="card  flex flex-col gap-6 items-center py-10">
            <div className="flex flex-col gap-4">
              <div className="circle h-28 w-28 bg-pink-500 flex items-center justify-center text-5xl font-bold">
                J
              </div>

              <div className="stars flex text-xl">
                <BiSolidStar className="" color="yellow" />
                <BiSolidStar className="" color="yellow" />
                <BiSolidStar className="" color="yellow" />
                <BiSolidStar className="" color="yellow" />
                <BiSolidStar className="" color="rgba(255,255,255,0.7)" />
              </div>
            </div>

            <div className="flex flex-col justify-around items-center">
              <div className="text-center py-6 px-6">
              This customer did not write a review.
                <a className="text-blue-300" title="Read More" href="#">
                  ....
                </a>
              </div>
              <div className="name mt-6">
                <b>John Wick</b> -02/09/1964
              </div>
            </div>
          </div>

          <div className="card flex flex-col gap-6 items-center py-10">
            <div className="circle h-28 w-28 bg-pink-500 flex items-center justify-center text-5xl font-bold">
              F
            </div>

            <div className="stars flex text-xl">
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="rgba(255,255,255,0.7)" />
            </div>
            <div className="text-centre my-6 px-6">
              This customer did not write a review.
            </div>
            <div className="name mt-6">
              <b>Finch Wecket</b> -12/08/1984
            </div>
          </div>

          <div className="card flex ] flex-col gap-6 items-center py-10">
            <div className="circle h-28 w-28 bg-pink-500 flex items-center justify-center text-5xl font-bold">
              E
            </div>

            <div className="stars flex text-xl">
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="rgba(255,255,255,0.7)" />
            </div>
            <div className="text-centre my-6 px-6">
              This customer did not write a review.
            </div>
            <div className="name mt-6">
              <b>Eren Vest</b> -02/28/1980
            </div>
          </div>

          <div className="card flex  flex-col gap-6 items-center py-10">
            <div className="circle h-28 w-28 bg-pink-500 flex items-center justify-center text-5xl font-bold">
              H
            </div>

            <div className="stars flex text-xl">
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="yellow" />
              <BiSolidStar className="" color="rgba(255,255,255,0.7)" />
            </div>
            <div className="text-centre my-6 px-6">
              This customer did not write a review.
            </div>
            <div className="name mt-6">
              <b>Heren Meckoley</b> -07/17/1990
            </div>
          </div>
        </Carousel>
      </div>

      <div className="flex sm:flex-row flex-col items-center justify-center gap-10 px-24 mt-10 w-screen py-10">
        <div className="img rounded-xl sm:w-[30vw] w-[100vw] flex justify-center">
          <img
            height={500}
            width={600}
            className="rounded-xl sm:w-[38vw] w-[80vw] sm:h-[40vh] h-[30vh]"
            src={sideImg.src}
            alt="sideImg"
          />
        </div>

        <div className="backdrop-blur-lg sm:w-[60vw] rounded-xl p-10 shadow-xl w-[80vw]">
          <div className="text-3xl ">
            <h1 className="sm:mt-4 sm:text-6xl sm:font-bold text-3xl text-white font-semibold">
              {" "}
              Coupons
            </h1>
          </div>
          <br />
          <div className="sm:text-3xl text-2xl ms-1 flex text-white">
            <div className="sm:flex hidden h-[inherit] mt-1 w-2 rounded-xl bg-white mx-2" />{" "}
            use vendor coupons to get amazing discounts for your orders by nasipaipon
          </div>
          <br />

          <button className="aboutbtn mt-10 w-[20vw] text-pretty">GET COUPON</button>
        </div>
      </div>

     {false && <div className="sm:w-screen sm:rounded-none rounded-lg w-[80vw] backdrop-blur-sm text-white my-10">
        <div className="sm:text-5xl text-3xl font-bold text-shadow-custom2 text-center my-10">
          CONTACT US
        </div>
        <div className="flex sm:flex-row flex-col sm:gap-14 gap-4 sm:justify-center items-center my-16">
          <div className="contact">
            <div className="form flex flex-col gap-6 items-center sm:items-start sm:w-[35vw] w-[80vw]">
              <div className="sm:text-2xl text-xl">
                Enter Your Details
              </div>
              <input
                className="formbg px-6 py-3 rounded-lg w-[70vw] sm:w-[35vw] placeholder-[rgba(000,000,000,0.6)]"
                type="text"
                placeholder="Name"
              />
              <input
                className="formbg px-6 py-3 rounded-lg w-[70vw] sm:w-[35vw] placeholder-[rgba(000,000,000,0.6)]"
                type="text"
                placeholder="Phone"
              />
              <input
                className="formbg px-6 py-3 rounded-lg w-[70vw] sm:w-[35vw] placeholder-[rgba(000,000,000,0.6)]"
                type="text"
                placeholder="Email"
              />
              <textarea
                className="formbg px-6 py-3 rounded-lg w-[70vw] sm:w-[35vw] placeholder-[rgba(000,000,000,0.6)]"
                name="message"
                rows={5}
                id="msg"
                placeholder="How can we serve you?"
              ></textarea>
              <button className="btn my-8 w-[70vw]"> SEND</button>
            </div>
          </div>

          <div className="side sm:w-[35vw] w-[70vw] sm:-mt-20 mt-14">
            <h1 className="text-2xl">SPECIAL REQUEST</h1>
            <br />
            <p className="opacity-80">
              {
                "Do you have dietary concerns? Questions about an upcoming event? Drop us a line, and we'll get back to you soon"
              }
              !
            </p>
            <br />
           
          </div>
        </div>
      </div>}

      <div className="about flex justify-center gap-6 items-center mt-16 sm:h-screen w-screen py-10 backdrop-blur-sm text-white">
        <div className='sm:w-[40vw] w-[90vw] sm:text-start text-start'>
          <h1 className='text-4xl font-bold'>
            Address <br />
          </h1>
          <br />
            <p className='text-lg'>Sales Stall</p>
            <p className='opacity-80'>Jalan 5/4C Desa Melawati Kuala Lumpur, 53100 Kuala Lumpur</p>
            <p className='text-lg'>Central Kitchen</p>
            <p className='opacity-80'>{"NO 6 JALAN WAWASAN CAMPURAN, BANDAR BARU AMPANG, 68000 AMPANG, SELANGOR"}</p>
            
            <br />
            
            <p className=''>Telephone</p>
            <a className='opacity-80' href='tel:+6018 274 3679'>+6018 274 3679</a>
            <br />
            <a className='opacity-80' href='tel:+6011 13073413'>+6011 13073413</a>
            
            <p className='mt-4'>Email</p>
            <a className='opacity-80' href="clearbusinessbyadrian@gmail.com">contact@nasipaipon.com</a>
            
        </div>

        <div className='sm:block hidden w-[40vw]'>
          <Image className='rounded-lg' width={650} src={aboutImg} alt='aboutImg' />
        </div>

      </div>

      <div className="sm:ms-2 mt-20 sm:px-60 px-5 m-auto pb-20 backdrop-blur-md text-gray-300">
    
    <div className="text-center text-5xl font-bold mb-20 text-white py-10">About Us</div>
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


      <div className="footer mt-72 cardbg text-white flex sm:flex-row flex-col w-[100vw] items-center gap-2 sm:justify-around py-3 sm:text-base text-xs">
        <div className=" opacity-80">
          {"Copyright © 2023 Nasi Paipon - All Rights Reserved."}
        </div>
        <div onClick={()=>router.push('/pages/privacy')} className=" opacity-80 cursor-pointer">Privacy Policy</div>
        <div className=" opacity-80">
          Powered by Revolution Software Pakistan
        </div>
      </div>

      <div className="fixed bottom-4 right-5">
        <button
        onClick={()=>router.push('/pages/download')}
          className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl sm:text-lg text-gray-50 bg-[#FE222E] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-red-600 before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-[9999] sm:px-4 px-3 sm:py-2 py-2 overflow-hidden border-2 rounded-full group"
          type="submit"
        >
          <span className="sm:block hidden">Order Now</span>
          <span className="block sm:hidden">Download Now</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 19"
            className="sm:w-8 sm:h-8 w-6 h-6 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-red-600 group-hover:border-red-600 sm:p-2 p-1 rotate-45"
          >
            <path
              className="fill-red-700 group-hover:fill-red-700"
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Page;
