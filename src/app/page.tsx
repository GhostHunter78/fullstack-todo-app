"use client";

import FormLabel from "./components/FormLabel";
import Header from "./components/Header";
import Dropdown from "./components/Dropdown";
import { useDropdown } from "../customHooks/useDropdown";
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

export default function Home() {
  const priority = useDropdown();
  const category = useDropdown();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosData = await getTodos();
        console.log("Todos on component mount:", todosData);
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchTodos();
  }, []);

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
      toast.success("Todo created successfully! 🎉", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      const updatedTodos = await getTodos();
      setTodos(updatedTodos);
      console.log("Updated todos:", updatedTodos);

      formRef.current?.reset();
      setTitle("");
      setDescription("");
      setDueDate("");
      priority.setSelected("");
      category.setSelected("");
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong! Please try again. 😞", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="bg-[#f6f6f7] pb-[100px]">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <section className="w-full px-4 mt-8">
        <div className="w-full py-5 px-4 flex flex-col items-center rounded-lg bg-[#f5deb3b2]">
          <h1 className="text-2xl font-bold text-purple-500 mb-5">
            Create your ToDo 😊
          </h1>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-y-4"
          >
            <FormLabel label="Title*">
              <input
                id="titleInput"
                name="title"
                type="text"
                placeholder="Enter task title"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
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
                className="w-full max-h-[150px] min-h-[80px] px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormLabel>

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

            <FormLabel label="Due Date (optional)">
              <input
                id="dueDateInput"
                name="dueDate"
                type="date"
                className="w-[200px] p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </FormLabel>

            <button
              type="submit"
              className="w-full py-3 mt-5 rounded-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create ToDo
            </button>
          </form>
        </div>
      </section>
      <section className="w-full px-4 mt-8 mb-10 flex flex-col gap-y-6">
        {todos.map((todo) => (
          <TodoCards key={todo.id} todo={todo} setTodos={setTodos} />
        ))}
      </section>
    </div>
  );
}
