import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

function SearchSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search");
  const [searchValue, setSearchValue] = useState(search || "");
  const [debouncedValue] = useDebounce(searchValue, 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set("search", debouncedValue);
    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedValue, router, searchParams]);

  return (
    <div className="w-full flex items-center gap-x-3">
      <div className="relative flex-1">
        <div className="grid grid-cols-[1fr_auto] items-center rounded-lg border border-gray-300 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent bg-white">
          <input
            type="text"
            placeholder="Search todos by title..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-l-lg focus:outline-none bg-transparent text-sm"
          />
          <div className="w-fit absolute right-0 px-3 text-gray-400">
            <IoSearch size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchSection;
