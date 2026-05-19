import Image from "next/image";
import React from "react";

const Banner = () => {
  return (
    <section className="relative w-full h-160 rounded-[32px] overflow-hidden">
      <Image
        src="/image/bannerImg.png"
        alt="bannerimg"
        fill
        priority
        className=" object-cover"
      ></Image>
      {/* Dark Overlay */}
      <div className="absolute inset-0  z-10"></div>

      {/* Left Blur Effect */}
      <div className="absolute inset-0 z-20 flex">
        {/* Solid Left Side */}
        <div className="w-[40%] bg-[#f8f5f0]"></div>

        {/* Blur Transition */}
        <div
          className="relative w-[25%] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 0%, black 70%, transparent 100%)",
          }}
        >
          {/* Blur Layer */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/10"></div>

          {/* Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f8f5f0] via-[#f8f5f0]/60 to-transparent"></div>
        </div>
        {/* content */}
        <div className="con absolute inset-0 flex items-center px-4 ">
          <div className="max-w-xl  flex  flex-col gap-7">
            <h1 className="text-6xl font-extrabold">
              Find Your Perfect <br />{" "}
              <span className="text-[#10b981]">Study Room</span>
            </h1>
            <p className="text-base text-gray-700 max-w-2/3">
              Browse and book quiet, private study rooms in your library. List
              your own room and earn.
            </p>
            <div className=" flex items-center gap-3">
              <button className="btn btn-xl btn-outline border-2 border-gray-300 rounded-full shadow-sm">
                Login
              </button>
              <button
                className="btn btn-xl
               btn-primary rounded-full bg-[#10b981] border-none shadow-sm"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
