import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-green-50 px-4">
      <div className="max-w-xl text-center">
        {/* 404 TEXT */}
        <h1 className="text-[120px] font-extrabold leading-none text-[#10b981]">
          404
        </h1>

        {/* TITLE */}
        <h2 className="mt-4 text-4xl font-bold text-gray-900">
          Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-4 text-lg text-gray-500">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* BUTTONS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-2xl bg-[#10b981] px-6 py-3 font-semibold text-white transition hover:bg-[#059669]"
          >
            Go Home
          </Link>

          <Link
            href="/all-rooms"
            className="rounded-2xl border border-[#10b981] px-6 py-3 font-semibold text-[#10b981] transition hover:bg-[#10b981] hover:text-white"
          >
            Browse Rooms
          </Link>
        </div>

        {/* EXTRA */}
        <div className="mt-12">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-green-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-[#10b981]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.8}
                d="M9.172 9a4 4 0 015.656 0M15 15h.01M9 15h.01M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
