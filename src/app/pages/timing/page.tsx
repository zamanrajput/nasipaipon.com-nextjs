"use client";
import React from "react";
import Image from "next/image";
import timing from "../../../../assets/assets/timing.webp";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="overflow-x-hidden">
      <div className="timing w-screen min-h-screen text-white py-10 mt-10">
        <h1 className="sm:text-5xl text-4xl font-bold sm:mt-0 mt-10 text-shadow-custom2 text-center py-10">
          TIMINGS
        </h1>
        <div className="about flex justify-center gap-14 items-center sm:mt-0 mt-16 my-10 w-[100vw]">
          <div className="text-center sm:text-start py-1 text-xl flex flex-col sm:gap-5 gap-10 sm:w-[500px] w-[100vw]">
            <div>
              <span className="text-white text-opacity-70 sm:text-3xl text-3xl">
                MONDAY
              </span>
              <br className="sm:hidden block" />
              <span className="sm:text-4xl text-3xl sm:ms-2">
                09:00AM - 07:00PM
              </span>
            </div>

            <div>
              <span className="text-white text-opacity-70 sm:text-3xl text-3xl">
                TUESDAY
              </span>
              <br className="sm:hidden block" />
              <span className="sm:text-4xl text-3xl sm:ms-2">
                09:00AM - 07:00PM
              </span>
            </div>
            <div>
              <span className="text-white text-opacity-70 sm:text-3xl text-3xl">
                WEDNESDAY
              </span>
              <br className="sm:hidden block" />
              <span className="sm:text-4xl text-3xl sm:ms-2">
                09:00AM - 07:00PM
              </span>
            </div>
            <div>
              <span className="text-white text-opacity-70 sm:text-3xl text-3xl">
                THURSDAY
              </span>
              <br className="sm:hidden block" />
              <span className="sm:text-4xl text-3xl sm:ms-2">
                09:00AM - 07:00PM
              </span>
            </div>
            <div>
              <span className="text-white text-opacity-70 sm:text-3xl text-3xl">
                FRIDAY
              </span>
              <br className="sm:hidden block" />
              <span className="sm:text-4xl text-3xl sm:ms-2">
                09:00AM - 07:00PM
              </span>
            </div>
            <div>
              <span className="text-white text-opacity-70 sm:text-3xl text-3xl">
                SATURDAY
              </span>
              <br className="sm:hidden block" />
              <span className="sm:text-4xl text-3xl sm:ms-2">
                09:00AM - 07:00PM
              </span>
            </div>
            <div>
              <span className="text-white text-opacity-70 sm:text-3xl text-3xl">
                SUNDAY
              </span>
              <br className="sm:hidden block" />
              <span className="sm:text-4xl text-3xl sm:ms-2">
                09:00AM - 07:00PM
              </span>
            </div>
          </div>

          <div className="sm:block hidden w-[40vw]">
            <Image className="rounded-lg" src={timing} alt="timing" />
          </div>
        </div>
      </div>

 
    </div>
  );
};

export default Page;
