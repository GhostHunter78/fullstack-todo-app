import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaUndoAlt } from "react-icons/fa";
import { Todo } from "../types";
import { useRef, useEffect, useState } from "react";
import { editStatus } from "../actions/editStatus";
import { getTodos } from "../actions/getTodos";
import { deleteTodo } from "../actions/deleteTodo";

function TodoCards({
  todo,
  setTodos,
}: {
  todo: Todo;
  setTodos: (todos: Todo[]) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleComplete = async () => {
    const formData = new FormData();
    formData.append("id", todo.id);
    formData.append("completed", todo.completed.toString());
    await editStatus(formData);

    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
    console.log("Updated todos:", updatedTodos);
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
    console.log("Updated todos:", updatedTodos);
  };

  return (
    <div
      style={{
        backgroundColor: todo.completed
          ? "#72dd36"
          : todo.priority === "High"
          ? "#ff000091"
          : todo.priority === "Medium"
          ? "#ffff0085"
          : "#ff000091",
      }}
      key={todo.id}
      className="w-full pt-3 pb-6 px-4 flex flex-col items-start rounded-lg text-sm"
    >
      <div className="w-full flex items-center gap-x-3">
        <div className="flex items-center gap-x-2 rounded-lg bg-[#f1f5fe] px-3 py-1 mb-4">
          <MdOutlineDateRange />
          <p>
            {new Date(todo.created_at).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
        {todo.due_date && (
          <div className="flex items-center gap-x-3">
            <MdLabelImportantOutline size={20} className="mb-4 text-white" />
            <div className="flex items-center gap-x-2 rounded-lg bg-[#f1f5fe] px-3 py-1 mb-4">
              <MdOutlineDateRange />
              <p>
                {new Date(todo.due_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        )}
      </div>
      <h2 className="text-[16px] mb-4">-{todo.title}-</h2>
      {todo.description && (
        <p className="text-sm mb-6 text-black">{todo.description}</p>
      )}
      <div ref={ref} className="w-full relative flex justify-end items-end">
        <HiDotsVertical
          size={20}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="cursor-pointer"
        />
        {isMenuOpen && (
          <div
            style={{
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            }}
            className="w-[200px] absolute top-8 right-0 z-10 p-4 bg-white rounded-lg"
          >
            <div
              onClick={handleComplete}
              className="flex items-center gap-x-2 pb-[10px] border-b border-gray-200 cursor-pointer"
            >
              {todo.completed ? (
                <FaUndoAlt size={20} />
              ) : (
                <MdCheckCircle size={20} />
              )}
              {todo.completed ? (
                <p className="text-[15px]">Incomplete</p>
              ) : (
                <p className="text-[15px]">Complete</p>
              )}
            </div>
            <div className="flex items-center gap-x-2 py-[10px] border-b border-gray-200">
              <FaEdit size={20} />
              <p className="text-[15px]">Edit</p>
            </div>
            <div
              onClick={handleDelete}
              className="flex items-center gap-x-2 pt-[10px] cursor-pointer"
            >
              <MdDelete size={20} />
              <p className="text-[15px]">Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoCards;
