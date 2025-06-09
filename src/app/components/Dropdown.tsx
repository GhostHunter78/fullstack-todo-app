"use client";

import { IoIosArrowDown } from "react-icons/io";
import { DropdownProps } from "../types";

const Dropdown: React.FC<DropdownProps> = ({
  placeholder,
  options,
  value,
  onChange,
  isOpen,
  setIsOpen,
  dropdownRef,
}) => {
  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        ref={dropdownRef}
        className="w-[200px] p-3 bg-white flex items-center justify-between rounded-lg cursor-pointer border border-gray-300 hover:border-gray-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className={`text-sm ${value ? "text-black" : "text-gray-500"}`}>
          {value || placeholder}
        </p>
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <IoIosArrowDown
            size={24}
            color="#6B7280"
          />
        </div>
      </div>

      <div
        className={`absolute top-full left-0 z-10 w-[200px] bg-white border border-gray-300 rounded-lg mt-1 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 max-h-[200px] visible"
            : "opacity-0 max-h-0 invisible overflow-hidden"
        }`}
      >
        {options.map((option, index) => (
          <div
            key={option.value}
            className={`w-full p-3 cursor-pointer transition-colors hover:bg-gray-100
              ${index === 0 ? "rounded-t-lg" : ""} ${
              index === options.length - 1
                ? "rounded-b-lg"
                : "border-b border-gray-200"
            }`}
            onClick={() => handleOptionClick(option.value)}
          >
            <p
              className={`text-sm font-medium ${
                option.color ? `text-[${option.color}]` : "text-gray-700"
              }`}
            >
              {option.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
