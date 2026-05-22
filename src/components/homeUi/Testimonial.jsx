import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";

const testimonials = [
  {
    id: 1,
    name: "Arif Hossain",
    role: "BUET Student",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "StudyNook has become my second home. The environment is perfect for deep focus and learning.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "DU Student",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "Super fast WiFi, calm atmosphere and comfortable seating. Worth every penny!",
  },
  {
    id: 3,
    name: "Rahat Ahmed",
    role: "NSU Student",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "I love the 24/7 access and clean study spaces. Highly recommended!",
  },
];

const Testimonial = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Content */}
        <div className="space-y-5">
          <p className="uppercase tracking-[3px] text-xs font-semibold text-zinc-400">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-[1.1] text-[#101828]">
            Loved by Students
            <br />
            Like You
          </h2>

          <div className="w-20 h-0.75 rounded-full bg-[#d7a86e]" />
        </div>

        {/* Right Content */}
        <div className="lg:col-span-3 relative">
          {/* Navigation */}
          {/* <div className="absolute -top-16 right-0 flex items-center gap-3">
            <button className="w-11 h-11 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 hover:bg-zinc-100 transition-all duration-300">
              <HiArrowLeft className="text-lg" />
            </button>

            <button className="w-11 h-11 rounded-full border border-zinc-200 bg-white flex items-center justify-center text-zinc-700 hover:bg-zinc-100 transition-all duration-300">
              <HiArrowRight className="text-lg" />
            </button>
          </div> */}

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-zinc-200 rounded-[28px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300"
              >
                {/* Top */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="relative w-14 h-14 overflow-hidden rounded-full border border-zinc-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-[17px] font-semibold text-[#111827]">
                      {item.name}
                    </h3>

                    <p className="text-sm text-zinc-400">{item.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-[2px] mb-5 text-[#FDB022]">
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} className="text-sm" />
                  ))}
                </div>

                {/* Review */}
                <p className="text-[15px] leading-7 text-zinc-600 min-h-[110px]">
                  “{item.review}”
                </p>

                {/* Quote */}
                <div className="flex justify-end mt-4">
                  <span className="text-5xl leading-none text-zinc-200 font-serif">
                    ”
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
