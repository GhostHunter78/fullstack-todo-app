import { FaUndoAlt } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from "../types";

function CardActionsMenu({
  handleComplete,
  handleDeleteClick,
  handleEditClick,
  todo,
}: {
  handleComplete: () => void;
  handleDeleteClick: () => void;
  handleEditClick: () => void;
  todo: Todo;
}) {
  return (
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
        {todo.completed ? <FaUndoAlt size={20} /> : <MdCheckCircle size={20} />}
        {todo.completed ? (
          <p className="text-[15px]">Incomplete</p>
        ) : (
          <p className="text-[15px]">Complete</p>
        )}
      </div>
      <div
        onClick={handleEditClick}
        className="flex items-center gap-x-2 py-[10px] border-b border-gray-200 cursor-pointer"
      >
        <FaEdit size={20} />
        <p className="text-[15px]">Edit</p>
      </div>
      <div
        onClick={handleDeleteClick}
        className="flex items-center gap-x-2 pt-[10px] cursor-pointer"
      >
        <MdDelete size={20} />
        <p className="text-[15px]">Delete</p>
      </div>
    </div>
  );
}

export default CardActionsMenu;
