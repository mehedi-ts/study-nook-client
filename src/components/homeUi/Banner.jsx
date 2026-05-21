import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowRight, Star } from "lucide-react";

const Banner = () => {
  return (
    <section className="relative overflow-hidden rounded-[40px] h-[620px] lg:h-[700px]">
      {/* Background Image */}
      <Image
        src="/image/bannerImg.png"
        alt="Study Room Banner"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Professional Gradient Overlay */}
      <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#f8f5f0]/95 via-[#f8f5f0]/75 to-transparent"></div>

      {/* Decorative Glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-[#10b981]/25 blur-[120px] rounded-full z-20"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-[#10b981]/15 blur-[120px] rounded-full z-20"></div>

      {/* Mobile Overlay */}
      <div className="absolute inset-0 z-20 lg:hidden bg-black/65"></div>

      {/* Content */}
      <div className="absolute inset-0 z-30 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-5">
          <div className="max-w-3xl flex flex-col gap-6 sm:gap-8">
            {/* Badge */}
            <div
              className="
                w-fit
                flex items-center gap-2
                px-5 py-2.5
                rounded-full
                border border-white/20
                bg-white/10
                lg:bg-white/70
                backdrop-blur-xl
                shadow-lg
              "
            >
              <Star size={16} className="text-[#10b981] fill-[#10b981]" />

              <p className="text-sm font-semibold text-white lg:text-gray-700">
                Trusted by 10,000+ Students
              </p>
            </div>

            {/* Heading */}
            <div className="space-y-4 sm:space-y-5">
              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                  font-black
                  leading-[1.1]
                  text-white
                  lg:text-gray-900
                "
              >
                Find Your Perfect
                <br />
                <span className="text-[#10b981]">Study Room</span>
              </h1>

              <p
                className="
                  text-sm
                  sm:text-base
                  lg:text-lg
                  leading-relaxed
                  max-w-xl
                  text-gray-200
                  lg:text-gray-700
                "
              >
                Browse and book quiet, private study rooms near your library or
                campus. Create your own listings and help students stay focused
                while earning extra income.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* Explore Rooms */}
              <Link href="/all-rooms" className="w-full sm:w-auto">
                <button
                  className="
                    group
                    w-full sm:w-auto
                    flex items-center justify-center gap-2
                    px-6 sm:px-8
                    py-3.5 sm:py-4
                    rounded-full
                    bg-[#10b981]
                    hover:bg-[#059669]
                    text-white
                    text-sm sm:text-base
                    font-semibold
                    shadow-[0_10px_35px_rgba(16,185,129,0.35)]
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                  "
                >
                  Explore Rooms
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>
              </Link>

              {/* Learn More */}
              <button
                className="
                  w-full sm:w-auto
                  px-6 sm:px-8
                  py-3.5 sm:py-4
                  rounded-full
                  border border-white/20 lg:border-gray-300
                  bg-white/10 lg:bg-white/70
                  backdrop-blur-xl
                  text-white lg:text-gray-800
                  text-sm sm:text-base
                  font-semibold
                  hover:bg-white/20
                  lg:hover:bg-white
                  transition-all
                  duration-300
                "
              >
                Learn More
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 sm:gap-10 pt-2">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white lg:text-gray-900">
                  500+
                </h2>

                <p className="text-sm text-gray-300 lg:text-gray-600 mt-1">
                  Study Rooms
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white lg:text-gray-900">
                  10K+
                </h2>

                <p className="text-sm text-gray-300 lg:text-gray-600 mt-1">
                  Happy Students
                </p>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-white lg:text-gray-900">
                  24/7
                </h2>

                <p className="text-sm text-gray-300 lg:text-gray-600 mt-1">
                  Availability
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-black/20 to-transparent z-20"></div>
    </section>
  );
};

export default Banner;
