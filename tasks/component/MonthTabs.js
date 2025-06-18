"use client";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function MonthTabs({ selectedMonth, setSelectedMonth }) {
  return (
    <div className="w-full bg-gradient-to-r from-gray-100 to-blue-50 shadow-md rounded-lg p-3">
      <div className="flex gap-10 justify-center flex-wrap">
        {months.map((month, index) => (
          <button
            key={month}
            className={`px-4 py-2 text-sm md:text-base rounded-full transition-all duration-300
              ${
                selectedMonth === index
                  ? "flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-500 hover:scale-105 hover:shadow-lg text-white py-2 px-4 rounded-full transition-transform duration-300 shadow-md"
                  : "bg-white text-gray-700 hover:bg-blue-100 border border-gray-300"
              }
            `}
            onClick={() => setSelectedMonth(index)}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
}
