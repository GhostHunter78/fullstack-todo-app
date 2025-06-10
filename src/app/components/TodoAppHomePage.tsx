"use client";

import Header from "./Header";
import { useDropdown } from "../../hooks/useDropdown";

import { useEffect, useState } from "react";
import { createTodo } from "../actions/createTodo";
import { getTodos } from "../actions/getTodos";
import { Todo } from "../types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoCards from "./TodoCards";
import FilterSection from "./FilterSection";
import { useSearchParams } from "next/navigation";
import SortSection from "./SortSection";
import { FaPlus } from "react-icons/fa";
import CreateTodoForm from "./CreateTodoForm";
import { User } from "@supabase/supabase-js";

export default function TodoAppHomePage({ user }: { user: User }) {
  const priority = useDropdown();
  const category = useDropdown();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showForm, setShowForm] = useState(false);
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

  const handleSubmit = async (formData: FormData) => {
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

            <CreateTodoForm
              handleSubmit={handleSubmit}
              toggleForm={toggleForm}
            />
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
