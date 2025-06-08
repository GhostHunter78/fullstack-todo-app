import { FaFilter } from "react-icons/fa";
import { priorityOptionsArray, categoryOptionsArray } from "./DropdownArrays";
import { useSearchParams } from "next/navigation";

function FilterSection() {
  const searchParams = useSearchParams();
  const currentPriority = searchParams.get("priority") || "all";
  const currentCategory = searchParams.get("category") || "all";
  const currentStatus = searchParams.get("status") || "all";

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  return (
    <>
      <div className="w-fit flex items-center gap-x-1 px-3 py-2 rounded-lg border-gray-400 bg-[#e2a1bc] cursor-pointer">
        <FaFilter size={20} />
        <p>Filter by:</p>
      </div>
      <div className="w-full flex flex-col items-start gap-y-4 mt-4">
        <p className="font-semibold">Priority: </p>
        <div className="flex items-center gap-x-2">
          {priorityOptionsArray.map((option) => (
            <a
              key={option.value}
              href={`?${createQueryString("priority", option.value)}`}
              className={`w-fit rounded-lg ${
                currentPriority.toLowerCase() === option.value.toLowerCase()
                  ? "bg-blue-100"
                  : "bg-white"
              } p-2 flex items-center gap-x-2 cursor-pointer hover:bg-blue-50 transition-colors`}
            >
              <div
                style={{ backgroundColor: option.color }}
                className="w-4 h-4 rounded-full"
              ></div>
              <p>{option.label}</p>
            </a>
          ))}
          <a
            href={`?${createQueryString("priority", "all")}`}
            className={`w-fit rounded-lg ${
              currentPriority === "all" ? "bg-blue-100" : "bg-white"
            } p-2 flex items-center gap-x-2 cursor-pointer hover:bg-blue-50 transition-colors`}
          >
            <p>All</p>
          </a>
        </div>
      </div>
      <div className="w-full flex flex-col items-start gap-y-4 mt-4">
        <p className="font-semibold">Category: </p>
        <div className="flex items-center gap-x-2 gap-y-2 flex-wrap">
          {categoryOptionsArray.map((option) => (
            <a
              key={option.value}
              href={`?${createQueryString("category", option.value)}`}
              className={`w-fit rounded-lg ${
                currentCategory.toLowerCase() === option.value.toLowerCase()
                  ? "bg-blue-100"
                  : "bg-white"
              } p-2 flex items-center gap-x-2 cursor-pointer hover:bg-blue-50 transition-colors`}
            >
              <p>{option.label}</p>
            </a>
          ))}
          <a
            href={`?${createQueryString("category", "all")}`}
            className={`w-fit rounded-lg ${
              currentCategory === "all" ? "bg-blue-100" : "bg-white"
            } p-2 flex items-center gap-x-2 cursor-pointer hover:bg-blue-50 transition-colors`}
          >
            <p>All</p>
          </a>
        </div>
      </div>

      <div className="w-full flex flex-col items-start gap-y-4 mt-4">
        <p className="font-semibold">Status: </p>
        <div className="flex items-center gap-x-2 gap-y-2 flex-wrap">
          <a
            href={`?${createQueryString("status", "active")}`}
            className={`w-fit rounded-lg ${
              currentStatus === "active" ? "bg-blue-100" : "bg-white"
            } p-2 flex items-center gap-x-2 cursor-pointer hover:bg-blue-50 transition-colors`}
          >
            <p>Active</p>
          </a>
          <a
            href={`?${createQueryString("status", "completed")}`}
            className={`w-fit rounded-lg ${
              currentStatus === "completed" ? "bg-blue-100" : "bg-white"
            } p-2 flex items-center gap-x-2 cursor-pointer hover:bg-blue-50 transition-colors`}
          >
            <p>Completed</p>
          </a>
          <a
            href={`?${createQueryString("status", "all")}`}
            className={`w-fit rounded-lg ${
              currentStatus === "all" ? "bg-blue-100" : "bg-white"
            } p-2 flex items-center gap-x-2 cursor-pointer hover:bg-blue-50 transition-colors`}
          >
            <p>All</p>
          </a>
        </div>
      </div>
    </>
  );
}

export default FilterSection;
