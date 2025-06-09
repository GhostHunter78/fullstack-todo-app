import { FaFilter } from "react-icons/fa";
import { priorityOptionsArray, categoryOptionsArray } from "./DropdownArrays";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function FilterSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPriority = searchParams.get("priority") || "all";
  const currentCategory = searchParams.get("category") || "all";
  const currentStatus = searchParams.get("status") || "all";
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (name: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(name, value);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const handleClearFilters = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("priority");
    newParams.delete("category");
    newParams.delete("status");
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 mb-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-x-2">
          <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center">
            <FaFilter size={16} color="#4F46E5" />
          </div>
          <h3 className="font-medium text-gray-800">Filters</h3>
        </div>
        <div className="flex items-center gap-x-4">
          {(currentPriority !== "all" ||
            currentCategory !== "all" ||
            currentStatus !== "all") && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClearFilters();
              }}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          )}
          {isExpanded ? (
            <IoMdArrowDropup size={24} />
          ) : (
            <IoMdArrowDropdown size={24} />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-6">
          <div className="border-b pb-4">
            <p className="font-medium text-gray-700 mb-3">Priority</p>
            <div className="flex flex-wrap gap-2">
              {priorityOptionsArray.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange("priority", option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-x-2 transition-colors cursor-pointer ${
                    currentPriority.toLowerCase() === option.value.toLowerCase()
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <div
                    style={{ backgroundColor: option.color }}
                    className="w-3 h-3 rounded-full"
                  ></div>
                  {option.label}
                </button>
              ))}
              <button
                onClick={() => handleFilterChange("priority", "all")}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                  currentPriority === "all"
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
            </div>
          </div>

          <div className="border-b pb-4">
            <p className="font-medium text-gray-700 mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              {categoryOptionsArray.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFilterChange("category", option.value)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                    currentCategory.toLowerCase() === option.value.toLowerCase()
                      ? "bg-indigo-100 text-indigo-700 font-medium"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
              <button
                onClick={() => handleFilterChange("category", "all")}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                  currentCategory === "all"
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
            </div>
          </div>

          <div>
            <p className="font-medium text-gray-700 mb-3">Status</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFilterChange("status", "active")}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                  currentStatus === "active"
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => handleFilterChange("status", "completed")}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                  currentStatus === "completed"
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => handleFilterChange("status", "all")}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer ${
                  currentStatus === "all"
                    ? "bg-indigo-100 text-indigo-700 font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterSection;
