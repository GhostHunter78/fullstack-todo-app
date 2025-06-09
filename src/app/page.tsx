"use client";

import FormLabel from "./components/FormLabel";
import Header from "./components/Header";
import Dropdown from "./components/Dropdown";
import { useDropdown } from "../hooks/useDropdown";
import {
  priorityOptionsArray,
  categoryOptionsArray,
} from "./components/DropdownArrays";
import { useEffect, useRef, useState } from "react";
import { createTodo } from "./actions/createTodo";
import { getTodos } from "./actions/getTodos";
import { Todo } from "./types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoCards from "./components/TodoCards";
import FilterSection from "./components/FilterSection";
import { useSearchParams } from "next/navigation";
import SortSection from "./components/SortSection";
import { FaPlus, FaCalendarAlt } from "react-icons/fa";
import {
  MdTitle,
  MdDescription,
  MdPriorityHigh,
  MdCategory,
} from "react-icons/md";

export default function Home() {
  const priority = useDropdown();
  const category = useDropdown();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const filters = {
          priority: searchParams.get("priority") || undefined,
          category: searchParams.get("category") || undefined,
          status: searchParams.get("status") || undefined,
        };
        const sortBy = searchParams.get("sortBy") || undefined;
        const todosData = await getTodos(filters, sortBy);
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
        toast.error("Failed to load todos");
      }
    };
    fetchTodos();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);

    if (priority.selected) {
      formData.set("priority", priority.selected);
    }
    if (category.selected) {
      formData.set("category", category.selected);
    }

    try {
      await createTodo(formData);
      toast.success("Todo created successfully! 🎉");

      const filters = {
        priority: searchParams.get("priority") || undefined,
        category: searchParams.get("category") || undefined,
        status: searchParams.get("status") || undefined,
      };
      const sortBy = searchParams.get("sortBy") || undefined;
      const updatedTodos = await getTodos(filters, sortBy);
      setTodos(updatedTodos);

      formRef.current?.reset();
      setTitle("");
      setDescription("");
      setDueDate("");
      priority.setSelected("");
      category.setSelected("");
      setShowForm(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen pb-[150px]">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-6">
          <button
            onClick={toggleForm}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200 font-medium cursor-pointer"
          >
            <FaPlus /> {showForm ? "Hide Form" : "Create New Todo"}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 transition-all duration-300 ease-in-out">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-4 px-6">
              <h1 className="text-xl font-bold text-white">Create Your Todo</h1>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >
              <FormLabel label="Title*">
                <input
                  id="titleInput"
                  name="title"
                  type="text"
                  placeholder="Enter task title"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormLabel>

              <FormLabel label="Description (optional)">
                <textarea
                  id="descriptionInput"
                  name="description"
                  placeholder="Enter task description"
                  maxLength={150}
                  className="w-full max-h-[150px] min-h-[80px] px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormLabel>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormLabel label="Priority Level*">
                  <Dropdown
                    placeholder="Select priority level"
                    options={priorityOptionsArray}
                    value={priority.selected}
                    onChange={priority.setSelected}
                    isOpen={priority.isOpen}
                    setIsOpen={priority.setIsOpen}
                    dropdownRef={priority.ref}
                  />
                </FormLabel>

                <FormLabel label="Category*">
                  <Dropdown
                    placeholder="Select category"
                    options={categoryOptionsArray}
                    value={category.selected}
                    onChange={category.setSelected}
                    isOpen={category.isOpen}
                    setIsOpen={category.setIsOpen}
                    dropdownRef={category.ref}
                  />
                </FormLabel>
              </div>

              <FormLabel label="Due Date (optional)">
                <input
                  id="dueDateInput"
                  name="dueDate"
                  type="date"
                  className="w-full md:w-[200px] p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-sm"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </FormLabel>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors shadow-sm cursor-pointer"
                >
                  Create Todo
                </button>
              </div>
            </form>
          </div>
        )}

        <section className="mb-8">
          <FilterSection />
        </section>

        <section className="mb-6">
          <SortSection />
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoCards key={todo.id} todo={todo} setTodos={setTodos} />
            ))
          ) : (
            <div className="col-span-full bg-white p-8 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-lg">
                No todos found. Create one or adjust your filters.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
