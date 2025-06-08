import { useRouter, useSearchParams } from "next/navigation";
import { TbArrowsSort } from "react-icons/tb";

function SortSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sortBy = searchParams.get("sortBy");

  const handleSortBy = (sortBy: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sortBy", sortBy);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="w-full flex items-center gap-x-4">
      <div className="w-fit flex items-center gap-x-1 px-3 py-2 rounded-lg border-gray-400 bg-[#e2a1bc]">
        <TbArrowsSort size={20} />
        <p>Sort by date:</p>
      </div>
      <div className="flex items-center gap-x-2">
        <div
          className={`w-fit px-3 py-2 rounded-lg border-gray-400 cursor-pointer hover:bg-blue-50 transition-colors ${
            sortBy === "newest" ? "bg-blue-100" : "bg-white"
          }`}
          onClick={() => handleSortBy("newest")}
        >
          Newest
        </div>
        <div
          className={`w-fit px-3 py-2 rounded-lg border-gray-400 cursor-pointer hover:bg-blue-50 transition-colors ${
            sortBy === "oldest" ? "bg-blue-100" : "bg-white"
          }`}
          onClick={() => handleSortBy("oldest")}
        >
          Oldest
        </div>
      </div>
    </div>
  );
}

export default SortSection;
