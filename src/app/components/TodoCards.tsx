import { HiDotsVertical } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import { MdLabelImportantOutline } from "react-icons/md";
import { Todo } from "../types";
import { useRef, useEffect, useState } from "react";
import { editStatus } from "../actions/editStatus";
import { getTodos } from "../actions/getTodos";
import { deleteTodo } from "../actions/deleteTodo";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";
import CardActionsMenu from "./CardActionsMenu";
import EditModal from "./EditModal";
import { editTodo } from "../actions/editTodo";

function TodoCards({
  todo,
  setTodos,
}: {
  todo: Todo;
  setTodos: (todos: Todo[]) => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleDeleteClick = () => {
    setIsMenuOpen(false);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteTodo(todo.id);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
    setShowDeleteModal(false);
    console.log("Updated todos:", updatedTodos);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEditClick = () => {
    setIsMenuOpen(false);
    setShowEditModal(true);
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  const handleConfirmEdit = async (formData: FormData) => {
    formData.append("id", todo.id);
    await editTodo(formData, todo.id);
    const updatedTodos = await getTodos();
    setTodos(updatedTodos);
    console.log("Updated todos:", updatedTodos);
    setShowEditModal(false);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: todo.completed
            ? "#72dd36"
            : todo.priority === "High"
            ? "#ff000091"
            : todo.priority === "Medium"
            ? "#ffff0085"
            : "#0000ff63",
        }}
        key={todo.id}
        className="w-full pt-3 pb-6 px-4 flex flex-col items-start rounded-lg text-sm"
      >
        <div className="w-full flex items-center justify-between">
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
            <>
              <div className="mb-4 text-white">
                <MdLabelImportantOutline size={20} />
              </div>
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
            </>
          )}
        </div>
        <h2 className="text-[16px] mb-4">-{todo.title}-</h2>
        {todo.description && (
          <p className="text-sm mb-6 text-black">{todo.description}</p>
        )}
        <div ref={ref} className="w-full relative flex justify-end items-end">
          <div
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HiDotsVertical size={20} />
          </div>
          {isMenuOpen && (
            <CardActionsMenu
              todo={todo}
              handleComplete={handleComplete}
              handleDeleteClick={handleDeleteClick}
              handleEditClick={handleEditClick}
            />
          )}
        </div>
      </div>

      {showDeleteModal && (
        <Modal>
          <DeleteModal
            handleCancelDelete={handleCancelDelete}
            handleConfirmDelete={handleConfirmDelete}
          />
        </Modal>
      )}

      {showEditModal && (
        <Modal>
          <EditModal
            handleCancelEdit={handleCancelEdit}
            handleConfirmEdit={handleConfirmEdit}
            todo={todo}
          />
        </Modal>
      )}
    </>
  );
}

export default TodoCards;
