"use client";
import { useState } from "react";
import MonthTabs from "@/component/MonthTabs";
import TaskTable from "@/component/TaskTable";

export default function Home() {
  const [selectedMonth, setSelectedMonth] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="overflow-x-auto bg-gray-200 p-2">
        <MonthTabs
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>

      {/* Mock tasks passed into TaskTable */}
      <TaskTable selectedMonth={selectedMonth} />
    </div>
  );
}
