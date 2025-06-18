"use client";
import { useEffect, useState } from "react";

export default function ShimmerUI() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="animate-pulse">
      <div className="overflow-hidden rounded-xl shadow-sm border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="p-3 border-b border-gray-200 w-3/12">
                <div className="h-4 bg-gray-300 rounded"></div>
              </th>
              <th className="p-3 border-b border-gray-200 w-7/12">
                <div className="h-4 bg-gray-300 rounded"></div>
              </th>
              <th className="p-3 border-b border-gray-200 w-2/12">
                <div className="h-4 bg-gray-300 rounded"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="p-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="p-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                </td>
                <td className="p-3 text-center">
                  <div className="flex justify-center space-x-3">
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                    <div className="h-4 w-4 bg-gray-200 rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
