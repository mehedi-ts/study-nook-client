import { Check } from "lucide-react";
import Image from "next/image";

const plans = [
  {
    id: 1,
    name: "Daily Pass",
    desc: "Perfect for short visits",
    price: "৳200",
    duration: "/ day",
    button: "Get Daily Pass",
    popular: false,
    features: [
      "Access for a Day",
      "Any Open Seat",
      "WiFi & Power Access",
      "Basic Amenities",
    ],
  },
  {
    id: 2,
    name: "Weekly Plan",
    desc: "Best for regular users",
    price: "৳999",
    duration: "/ week",
    button: "Get Weekly Plan",
    popular: true,
    features: [
      "Full Week Access",
      "Any Study Room",
      "Priority Booking",
      "All Amenities Included",
    ],
  },
  {
    id: 3,
    name: "Monthly Premium",
    desc: "For ultimate productivity",
    price: "৳2999",
    duration: "/ month",
    button: "Get Monthly Plan",
    popular: false,
    features: [
      "Unlimited Access",
      "All Premium Rooms",
      "24/7 Access",
      "Free Coffee & Printing",
    ],
  },
];
const PricingSection = () => {
  return (
    <section className="w-full py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-12">
          <p className="uppercase tracking-[3px] text-xs font-semibold text-zinc-400 mb-4">
            Membership Plans
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-[#101828]">
            Choose Your Perfect Plan
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-stretch">
          {/* Pricing Cards */}
          <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-[30px] border bg-white p-7 transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular
                    ? "border-[#22C55E] shadow-[0_12px_40px_rgba(34,197,94,0.18)]"
                    : "border-zinc-200 shadow-[0_6px_25px_rgba(0,0,0,0.05)]"
                }`}
              >
                {/* Badge */}
                {plan.popular && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-[#22C55E] text-white text-xs font-semibold px-5 py-2 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Top */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#101828] mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-zinc-500 text-sm">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-8">
                  <h2 className="text-5xl font-bold tracking-tight text-[#101828]">
                    {plan.price}
                  </h2>

                  <span className="text-zinc-500 mb-1 text-sm">
                    {plan.duration}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-10">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#22C55E]/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                      </div>

                      <p className="text-[15px] text-zinc-600">{feature}</p>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  className={`w-full h-12 rounded-2xl font-medium transition-all duration-300 ${
                    plan.popular
                      ? "bg-[#22C55E] hover:bg-[#16A34A] text-white shadow-lg"
                      : "bg-white border border-zinc-200 hover:bg-zinc-100 text-[#101828]"
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            ))}
          </div>

          {/* Right Side Banner */}
          <div className="relative overflow-hidden rounded-[32px] min-h-[520px]">
            {/* Next Image */}
            <Image
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop"
              alt="Study Space"
              fill
              priority
              className="object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/75 z-10" />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-10">
              <div className="space-y-5">
                <h2 className="text-white text-4xl font-bold leading-tight">
                  More Than a
                  <br />
                  Study Space
                </h2>

                <p className="text-zinc-200 text-lg leading-8 max-w-xs">
                  It&apos;s a Community of Focused Minds.
                </p>

                <div className="w-16 h-[3px] rounded-full bg-[#D6A76C]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
